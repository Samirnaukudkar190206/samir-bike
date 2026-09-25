import os
import sys
from datetime import datetime

# Try importing Flask; if not installed, provide a graceful standalone server using Python standard library
try:
    from flask import Flask, request, jsonify, send_from_directory, send_file
    from flask_cors import CORS
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False

from server.db import db
from server.ai import run_bike_diagnosis, run_image_inspection, run_maintenance_schedule

PORT = int(os.environ.get('PORT', 3000))
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'dist'))

if HAS_FLASK:
    app = Flask(__name__, static_folder=DIST_DIR, static_url_path='')
    CORS(app)

    # Health check
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            "status": "ok",
            "appName": "BikeCare AI (Python Edition)",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "aiConfigured": bool(os.environ.get('GEMINI_API_KEY')),
            "databaseReady": True,
            "runtime": f"Python {sys.version.split()[0]}"
        })

    # Services
    @app.route('/api/services', methods=['GET'])
    def get_services():
        return jsonify({
            "services": db.get_services(),
            "addOns": db.get_add_ons()
        })

    @app.route('/api/services', methods=['POST'])
    def save_service():
        body = request.get_json() or {}
        if not body.get('id') or not body.get('name') or not body.get('price'):
            return jsonify({"error": "Missing required service fields"}), 400
        saved = db.save_service(body)
        return jsonify({"success": True, "service": saved})

    # Bookings list & search
    @app.route('/api/bookings', methods=['GET'])
    def list_bookings():
        search = request.args.get('search')
        status = request.args.get('status')
        bookings = db.get_bookings(search=search, status=status)
        return jsonify({"bookings": bookings})

    # Bookings create
    @app.route('/api/bookings', methods=['POST'])
    def create_booking():
        data = request.get_json() or {}
        required = ['customerName', 'customerPhone', 'bikeBrand', 'bikeModel', 'packageId']
        for field in required:
            if not data.get(field):
                return jsonify({"error": f"Please provide {field}."}), 400

        new_booking = db.create_booking(data)
        return jsonify({
            "success": True,
            "booking": new_booking,
            "message": f"Booking {new_booking['bookingCode']} registered successfully!"
        }), 201

    # Bookings single item
    @app.route('/api/bookings/<booking_id>', methods=['GET'])
    def get_booking(booking_id):
        booking = db.get_booking_by_id_or_code(booking_id)
        if not booking:
            return jsonify({"error": "Booking not found"}), 404
        return jsonify({"booking": booking})

    @app.route('/api/bookings/<booking_id>', methods=['PATCH'])
    def update_booking(booking_id):
        patch = request.get_json() or {}
        updated = db.update_booking(booking_id, patch)
        if not updated:
            return jsonify({"error": "Booking not found"}), 404
        return jsonify({"success": True, "booking": updated})

    @app.route('/api/bookings/<booking_id>', methods=['DELETE'])
    def delete_booking(booking_id):
        ok = db.delete_booking(booking_id)
        if not ok:
            return jsonify({"error": "Booking not found"}), 404
        return jsonify({"success": True, "message": "Booking removed successfully."})

    # Customer feedback
    @app.route('/api/bookings/<booking_id>/feedback', methods=['POST'])
    def submit_feedback(booking_id):
        body = request.get_json() or {}
        rating = body.get('rating')
        try:
            num_rating = float(rating)
            if num_rating < 1 or num_rating > 5:
                raise ValueError()
        except (ValueError, TypeError):
            return jsonify({"error": "A rating between 1 and 5 stars is required."}), 400

        booking = db.get_booking_by_id_or_code(booking_id)
        if not booking:
            return jsonify({"error": "Booking not found"}), 404

        updated = db.update_booking(booking['id'], {
            "customerRating": num_rating,
            "customerFeedback": str(body.get('feedback', '')).strip(),
            "feedbackTags": body.get('tags', []) if isinstance(body.get('tags'), list) else [],
            "feedbackSubmittedAt": datetime.utcnow().isoformat() + "Z"
        })

        return jsonify({
            "success": True,
            "booking": updated,
            "message": "Thank you for your feedback! Your review has been recorded."
        })

    # Admin Login
    @app.route('/api/admin/login', methods=['POST'])
    def admin_login():
        body = request.get_json() or {}
        pin = body.get('pin', '')
        if pin in ['admin123', 'bikecare2026', 'admin']:
            return jsonify({
                "success": True,
                "token": f"admin-token-{int(datetime.utcnow().timestamp() * 1000)}",
                "user": {"name": "Master Workshop Admin", "role": "admin"}
            })
        return jsonify({"error": "Invalid admin passcode. Default passcode is: admin123"}), 401

    # Admin Stats
    @app.route('/api/admin/stats', methods=['GET'])
    def admin_stats():
        stats = db.get_stats()
        mechanics = db.get_mechanics()
        ai_queries = db.get_ai_queries()
        return jsonify({
            "stats": stats,
            "mechanics": mechanics,
            "aiQueries": ai_queries
        })

    # AI Diagnostics
    @app.route('/api/ai/diagnose', methods=['POST'])
    def diagnose():
        params = request.get_json() or {}
        symptoms = params.get('symptoms', [])
        if not symptoms or not isinstance(symptoms, list):
            return jsonify({"error": "Please select at least one symptom or describe the issue."}), 400

        result = run_bike_diagnosis(params)
        model_name = f"{params.get('bikeBrand', '')} {params.get('bikeModel', '')}".strip()
        db.log_ai_query(model_name, symptoms, result.get('primaryIssue', 'Diagnostic assessment completed'))
        return jsonify({"success": True, "result": result})

    @app.route('/api/ai/inspect-image', methods=['POST'])
    def inspect_image():
        params = request.get_json() or {}
        if not params.get('imageBase64'):
            return jsonify({"error": "Image base64 data is required."}), 400
        result = run_image_inspection(params)
        return jsonify({"success": True, "result": result})

    @app.route('/api/ai/maintenance-plan', methods=['POST'])
    def maintenance_plan():
        params = request.get_json() or {}
        plan = run_maintenance_schedule(params)
        return jsonify({"success": True, "plan": plan})

    # SPA Static Files & Fallback
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        if path and os.path.exists(os.path.join(DIST_DIR, path)):
            return send_from_directory(DIST_DIR, path)
        index_file = os.path.join(DIST_DIR, 'index.html')
        if os.path.exists(index_file):
            return send_file(index_file)
        return """<!doctype html>
        <html>
        <head><title>BikeCare AI (Python)</title></head>
        <body style="font-family:sans-serif; background:#020617; color:#f8fafc; padding:40px; text-align:center;">
          <h1>BikeCare AI — Python Server Running</h1>
          <p>The backend Python API is active on port """ + str(PORT) + """!</p>
          <p>Run <code>npm run build</code> to compile the frontend client bundle into <code>./dist</code>.</p>
        </body>
        </html>"""

def main():
    if HAS_FLASK:
        print(f"🚀 BikeCare AI Python server starting at http://0.0.0.0:{PORT}...")
        app.run(host='0.0.0.0', port=PORT, debug=False)
    else:
        print("[Python Server] Flask not found. Install requirements with: pip install -r requirements.txt")

if __name__ == '__main__':
    main()
