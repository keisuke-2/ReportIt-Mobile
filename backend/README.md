Django backend for ReportIt (minimal)

This small API delegates authentication to Firebase using the REST API.

Setup
1. Create a Python virtualenv and install dependencies:

   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt

2. Create a `.env` file at the `backend/` folder root with the following keys:

   FIREBASE_API_KEY=your_firebase_web_api_key
   DJANGO_SECRET=replace-this-secret

3. Run migrations and start the server:

   python manage.py migrate
   python manage.py runserver

Endpoints
- POST /api/signup/  { email, password }
- POST /api/login/   { email, password }

Notes
- This implementation forwards Firebase responses as-is. In production you should
  validate and sanitize returned data, add rate-limiting, HTTPS, and proper error handling.
