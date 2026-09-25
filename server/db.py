import json
import os
import random
import string
from datetime import datetime
from typing import Dict, List, Optional, Any

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data'))
DB_FILE = os.path.join(DATA_DIR, 'bikecare-db.json')

class Database:
    def __init__(self):
        self._ensure_db()

    def _ensure_db(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        if not os.path.exists(DB_FILE):
            initial_data = {
                "services": [],
                "addOns": [],
                "bookings": [],
                "mechanics": [],
                "aiQueries": []
            }
            with open(DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(initial_data, f, indent=2)

    def _read_data(self) -> Dict[str, Any]:
        self._ensure_db()
        try:
            with open(DB_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"[Python DB] Error reading DB: {e}")
            return {"services": [], "addOns": [], "bookings": [], "mechanics": [], "aiQueries": []}

    def _write_data(self, data: Dict[str, Any]):
        try:
            with open(DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"[Python DB] Error writing DB: {e}")

    # --- Services & AddOns ---
    def get_services(self) -> List[Dict[str, Any]]:
        return self._read_data().get('services', [])

    def get_add_ons(self) -> List[Dict[str, Any]]:
        return self._read_data().get('addOns', [])

    def save_service(self, service: Dict[str, Any]) -> Dict[str, Any]:
        data = self._read_data()
        services = data.setdefault('services', [])
        idx = next((i for i, s in enumerate(services) if s.get('id') == service.get('id')), -1)
        if idx >= 0:
            services[idx] = service
        else:
            services.append(service)
        self._write_data(data)
        return service

    # --- Bookings ---
    def get_bookings(self, search: Optional[str] = None, status: Optional[str] = None) -> List[Dict[str, Any]]:
        data = self._read_data()
        bookings = data.get('bookings', [])

        if status and status != 'all':
            bookings = [b for b in bookings if b.get('status') == status]

        if search and search.strip():
            q = search.lower().strip()
            bookings = [
                b for b in bookings
                if q in str(b.get('bookingCode', '')).lower()
                or q in str(b.get('customerName', '')).lower()
                or q in str(b.get('customerPhone', '')).lower()
                or q in str(b.get('bikeBrand', '')).lower()
                or q in str(b.get('bikeModel', '')).lower()
                or q in str(b.get('assignedMechanic', '')).lower()
            ]

        # Sort newest first
        def get_timestamp(b):
            ts = b.get('createdAt')
            return ts if ts else ''

        bookings.sort(key=get_timestamp, reverse=True)
        return bookings

    def get_booking_by_id_or_code(self, identifier: str) -> Optional[Dict[str, Any]]:
        data = self._read_data()
        identifier_lower = identifier.strip().lower()
        for b in data.get('bookings', []):
            if (b.get('id') and b['id'].lower() == identifier_lower) or \
               (b.get('bookingCode') and b['bookingCode'].lower() == identifier_lower):
                return b
        return None

    def create_booking(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        data = self._read_data()
        services = data.get('services', [])
        add_ons = data.get('addOns', [])

        package_id = payload.get('packageId', '')
        pkg = next((s for s in services if s.get('id') == package_id), None)
        base_price = pkg.get('price', 499) if pkg else 499
        package_name = pkg.get('name', 'Custom Service') if pkg else 'Custom Service'

        # Calculate add-on cost
        chosen_addons = payload.get('addOnIds', [])
        addon_cost = 0
        for aid in chosen_addons:
            found = next((a for a in add_ons if a.get('id') == aid), None)
            if found:
                addon_cost += found.get('price', 0)

        # Generate unique booking code e.g. BK-4982
        random_digits = random.randint(1000, 9999)
        code = f"BK-{random_digits}"
        now_iso = datetime.utcnow().isoformat() + "Z"

        new_booking = {
            "id": f"book-{int(datetime.utcnow().timestamp() * 1000)}",
            "bookingCode": code,
            "createdAt": now_iso,
            "status": "registered",
            "customerName": payload.get('customerName', '').strip(),
            "customerPhone": payload.get('customerPhone', '').strip(),
            "customerEmail": payload.get('customerEmail', '').strip() or None,
            "customerAddress": payload.get('customerAddress', '').strip(),
            "pickupTimeSlot": payload.get('pickupTimeSlot', '10:00 AM - 12:00 PM'),
            "pickupDate": payload.get('pickupDate', datetime.utcnow().strftime('%Y-%m-%d')),
            "bikeType": payload.get('bikeType', 'commuter_motorcycle'),
            "bikeBrand": payload.get('bikeBrand', '').strip(),
            "bikeModel": payload.get('bikeModel', '').strip(),
            "bikeYear": int(payload.get('bikeYear')) if payload.get('bikeYear') else 2022,
            "registrationNumber": payload.get('registrationNumber', '').strip() or None,
            "packageId": package_id,
            "packageName": package_name,
            "basePrice": base_price,
            "addOnIds": chosen_addons,
            "additionalCost": 0,
            "totalCost": base_price + addon_cost,
            "customerNotes": payload.get('customerNotes', '').strip(),
            "aiDiagnosticNotes": payload.get('aiDiagnosticNotes', '').strip() or None,
            "assignedMechanic": "Marcus Vance",
            "technicianNotes": "Pending initial vehicle check upon arrival.",
            "isPaid": False,
            "customerRating": None,
            "customerFeedback": None,
            "feedbackTags": []
        }

        data.setdefault('bookings', []).append(new_booking)
        self._write_data(data)
        return new_booking

    def update_booking(self, identifier: str, patch: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        data = self._read_data()
        bookings = data.setdefault('bookings', [])
        idx = -1
        identifier_lower = identifier.strip().lower()
        for i, b in enumerate(bookings):
            if (b.get('id') and b['id'].lower() == identifier_lower) or \
               (b.get('bookingCode') and b['bookingCode'].lower() == identifier_lower):
                idx = i
                break

        if idx == -1:
            return None

        current = bookings[idx]
        for key, val in patch.items():
            if key != 'id':
                current[key] = val

        # Recalculate total cost if additionalCost was patched
        if 'additionalCost' in patch:
            base = current.get('basePrice', 0)
            addons = sum(
                next((a.get('price', 0) for a in data.get('addOns', []) if a.get('id') == aid), 0)
                for aid in current.get('addOnIds', [])
            )
            extra = current.get('additionalCost', 0)
            current['totalCost'] = base + addons + extra

        bookings[idx] = current
        self._write_data(data)
        return current

    def delete_booking(self, identifier: str) -> bool:
        data = self._read_data()
        bookings = data.get('bookings', [])
        identifier_lower = identifier.strip().lower()
        initial_len = len(bookings)
        data['bookings'] = [
            b for b in bookings
            if not ((b.get('id') and b['id'].lower() == identifier_lower) or
                    (b.get('bookingCode') and b['bookingCode'].lower() == identifier_lower))
        ]
        if len(data['bookings']) < initial_len:
            self._write_data(data)
            return True
        return False

    # --- Analytics & Mechanics ---
    def get_mechanics(self) -> List[Dict[str, Any]]:
        return self._read_data().get('mechanics', [])

    def get_ai_queries(self) -> List[Dict[str, Any]]:
        return self._read_data().get('aiQueries', [])

    def log_ai_query(self, bike_model: str, symptoms: List[str], result_summary: str):
        data = self._read_data()
        queries = data.setdefault('aiQueries', [])
        new_q = {
            "id": f"q-{int(datetime.utcnow().timestamp() * 1000)}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "bikeModel": bike_model,
            "symptoms": symptoms,
            "resultSummary": result_summary
        }
        queries.insert(0, new_q)
        if len(queries) > 50:
            data['aiQueries'] = queries[:50]
        self._write_data(data)

    def get_stats(self) -> Dict[str, Any]:
        data = self._read_data()
        bookings = data.get('bookings', [])
        total = len(bookings)
        completed = sum(1 for b in bookings if b.get('status') == 'delivered')
        in_progress = sum(1 for b in bookings if b.get('status') in ['diagnostic_complete', 'in_repair', 'ready_for_delivery', 'in_transit'])
        revenue = sum(b.get('totalCost', 0) for b in bookings if b.get('status') == 'delivered' or b.get('isPaid'))
        
        # Calculate average customer rating
        rated_bookings = [b for b in bookings if b.get('customerRating')]
        avg_rating = round(sum(b['customerRating'] for b in rated_bookings) / len(rated_bookings), 1) if rated_bookings else 4.9

        return {
            "totalBookings": total,
            "completedBookings": completed,
            "inProgressBookings": in_progress,
            "totalRevenue": revenue,
            "avgRating": avg_rating
        }

db = Database()
