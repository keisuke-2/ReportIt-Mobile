@echo off
echo Setting up Django backend for ReportIt Mobile...

echo.
echo Step 1: Creating virtual environment...
python -m venv venv

echo.
echo Step 2: Activating virtual environment...
call venv\Scripts\activate

echo.
echo Step 3: Installing Django and dependencies...
pip install -r requirements.txt

echo.
echo Step 4: Creating Django project...
django-admin startproject reportit_backend .

echo.
echo Step 5: Creating users app...
cd reportit_backend || cd .
python ../manage.py startapp users

echo.
echo Setup complete! 
echo.
echo Next steps:
echo 1. Run: cd backend
echo 2. Run: venv\Scripts\activate
echo 3. Run: python manage.py migrate
echo 4. Run: python manage.py runserver 0.0.0.0:8000
echo.
pause
