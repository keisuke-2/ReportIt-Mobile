# Django Setup Guide for ReportIt Mobile

## What This Does:
- **Pure Django backend** (NO Firebase authentication)
- User data stored in Django database with your exact fields: UserID, Name, Email, Password, Role, Barangay
- React Native app sends registration/login requests to Django
- Django handles ALL user management

## Quick Setup Steps:

### 1. Setup Django Backend

```bash
# Navigate to backend folder
cd backend

# Run the setup script (Windows)
setup_django.bat

# OR manually:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
django-admin startproject reportit_backend .
cd reportit_backend
python ../manage.py startapp users
```

### 2. Configure Django Files

Copy these files to your Django project:

1. **users/models.py** ← Copy from `users_models.py`
2. **users/views.py** ← Copy from `users_views.py`  
3. **users/urls.py** ← Copy from `users_urls.py`
4. **reportit_backend/settings.py** ← Copy from `django_settings.py`
5. **reportit_backend/urls.py** ← Copy from `main_urls.py`

### 3. Create Database

```bash
# In backend folder, with venv activated
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional
```

### 4. Find Your Computer's IP Address

```bash
# Windows
ipconfig

# Look for "IPv4 Address" (usually starts with 192.168.x.x)
```

### 5. Update React Native Service

In `services/pureDjangoAuthService.js`, update line 5:
```javascript
const DJANGO_BASE_URL = 'http://YOUR_IP_ADDRESS:8000/api';
// Example: 'http://192.168.1.100:8000/api'
```

### 6. Start Django Server

```bash
# In backend folder
venv\Scripts\activate
python manage.py runserver 0.0.0.0:8000
```

You should see:
```
Starting development server at http://0.0.0.0:8000/
```

### 7. Test Your App

1. Start Django server (step 6)
2. Start React Native: `npx expo start`
3. Try registering a new user
4. Check Django admin at `http://localhost:8000/admin/` to see users

## API Endpoints:

- `POST /api/users/register/` - Register new user
- `POST /api/users/login/` - Login user  
- `POST /api/users/check-username/` - Check username availability
- `GET /api/users/list/` - List all users (admin)

## Database Fields:

Your Django database will store users with exactly these fields:
- **UserID** (UUID)
- **Name** (Full name)
- **Email** (Email address)
- **Password** (Hashed)
- **Role** (User/Admin)
- **Barangay** (Location)

## Troubleshooting:

1. **"Network request failed"** = Django server not running
2. **"Connection refused"** = Wrong IP address in React Native service
3. **"500 Internal Server Error"** = Check Django console for errors

## For Production:
- Use PostgreSQL instead of SQLite
- Set DEBUG = False
- Configure proper CORS origins
- Use environment variables for secrets
