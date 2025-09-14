# Django URLs (urls.py)
from django.urls import path
from . import views

urlpatterns = [
    # User registration and authentication
    path('users/register/', views.register_user, name='register_user'),
    path('users/verify/', views.verify_user, name='verify_user'),
    path('users/<str:firebase_uid>/', views.get_user, name='get_user'),
    path('users/', views.list_users, name='list_users'),
]

# Main project urls.py should include:
# path('api/', include('your_app.urls')),
