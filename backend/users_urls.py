# urls.py - Put this in your Django users app
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    path('check-username/', views.check_username, name='check_username'),
    path('list/', views.list_users, name='list_users'),
]
