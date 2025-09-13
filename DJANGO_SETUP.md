# Django Backend Integration for ReportIt Mobile

This setup integrates Django backend with your React Native Firebase app for user management.

## Architecture

1. **Firebase Auth** - Handles authentication (login/logout)
2. **Django Backend** - Stores user data in PostgreSQL/MySQL database
3. **React Native** - Mobile app frontend

## Django Setup Instructions

### 1. Create Django Project

```bash
# Create virtual environment
python -m venv reportit_backend
source reportit_backend/bin/activate  # On Windows: reportit_backend\Scripts\activate

# Install Django and dependencies
pip install django djangorestframework django-cors-headers psycopg2-binary

# Create Django project
django-admin startproject reportit_backend
cd reportit_backend

# Create Django app
python manage.py startapp users
```

### 2. Django Settings (settings.py)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'users',  # Your app
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS settings for React Native
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8081",
    "http://127.0.0.1:8081",
]

CORS_ALLOW_ALL_ORIGINS = True  # For development only

# Database (use PostgreSQL or MySQL for production)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Custom User Model
AUTH_USER_MODEL = 'users.CustomUser'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}
```

### 3. File Structure

Copy the example files to your Django project:

```
reportit_backend/
├── users/
│   ├── models.py          # Copy from models_example.py
│   ├── views.py           # Copy from views_example.py
│   ├── serializers.py     # Copy from serializers_example.py
│   └── urls.py            # Copy from urls_example.py
└── reportit_backend/
    └── urls.py            # Add API URLs
```

### 4. Run Django Server

```bash
# Make migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver 0.0.0.0:8000
```

## React Native Setup

### 1. Update Django Service URL

In `services/djangoAuthService.js`, update the Django URL:

```javascript
const DJANGO_BASE_URL = 'http://YOUR_COMPUTER_IP:8000/api';
// For local development: 'http://192.168.1.100:8000/api'
// For production: 'https://your-domain.com/api'
```

### 2. API Endpoints

The Django backend provides these endpoints:

- `POST /api/users/register/` - Register new user
- `POST /api/users/verify/` - Verify user exists
- `GET /api/users/{firebase_uid}/` - Get user by Firebase UID
- `GET /api/users/` - List all users

## How It Works

1. **User Registration**:
   - Creates Firebase Auth account
   - Sends user data to Django backend
   - Django stores user in database with your fields: UserID, Name, Email, Password, Role, Barangay

2. **User Login**:
   - Firebase handles authentication
   - Django can verify user exists and return additional data

3. **Data Storage**:
   - Firebase: Authentication only
   - Django: All user data in your specified format

## Database Schema

Your Django database will have this table structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    UserID VARCHAR(100) UNIQUE,     -- Firebase UID
    Name VARCHAR(300),               -- Full name
    Email VARCHAR(254) UNIQUE,       -- Email address
    Password VARCHAR(128),           -- Hashed password
    Role VARCHAR(50),                -- User/Admin
    Barangay VARCHAR(200),           -- Location
    firebase_uid VARCHAR(100) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## Testing

1. Start Django server: `python manage.py runserver`
2. Start React Native: `npx expo start`
3. Register a new user in the mobile app
4. Check Django admin or database to see the user data

## Production Deployment

For production:
1. Use PostgreSQL or MySQL database
2. Deploy Django to Heroku, AWS, or your preferred platform
3. Update `DJANGO_BASE_URL` in React Native app
4. Configure proper CORS settings
5. Use environment variables for sensitive data
