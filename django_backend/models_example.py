# Django Models (models.py)
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator

class CustomUser(AbstractUser):
    """Custom User model for ReportIt app"""
    
    # Override default fields
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    
    # Custom fields matching your table structure
    UserID = models.CharField(max_length=100, unique=True)  # Firebase UID
    Name = models.CharField(max_length=300)  # Full name
    Email = models.EmailField(unique=True)  # Duplicate for consistency
    Role = models.CharField(
        max_length=50, 
        choices=[('User', 'User'), ('Admin', 'Admin')],
        default='User'
    )
    Barangay = models.CharField(max_length=200)
    
    # Firebase integration
    firebase_uid = models.CharField(max_length=100, unique=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Use email as username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'UserID']
    
    def save(self, *args, **kwargs):
        # Automatically set Name field
        self.Name = f"{self.first_name} {self.last_name}"
        self.Email = self.email  # Keep consistency
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.Name} ({self.email})"
    
    class Meta:
        db_table = 'users'  # Custom table name
        verbose_name = 'User'
        verbose_name_plural = 'Users'
