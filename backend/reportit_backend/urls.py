from django.urls import path, include
from .views import health

urlpatterns = [
    path('', health),
    path('api/', include('authapi.urls')),
]
