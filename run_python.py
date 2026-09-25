#!/usr/bin/env python3
"""
BikeCare AI — Standalone Python Server Launcher
Can be run on any system with Python 3:
  python3 run_python.py
"""

import sys
import os

try:
    import flask
    print("Flask detected. Launching Flask application from app.py...")
    import app
    app.main()
except ImportError:
    print("Flask is not installed in the current environment.")
    print("To install Flask & all dependencies run:")
    print("  pip install -r requirements.txt")
    print("  python3 app.py")
    sys.exit(1)
