# models.py - Put this in your Django users app
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    """User model with your exact fields: UserID, Name, Email, Password, Role, Barangay"""
    
    # Your required fields
    UserID = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    Name = models.CharField(max_length=300)
    Email = models.EmailField(unique=True)
    Role = models.CharField(
        max_length=50, 
        choices=[('User', 'User'), ('Admin', 'Admin')],
        default='User'
    )
    Barangay = models.CharField(max_length=200)
    
    # Override default fields to use Email as username
    username = models.CharField(max_length=150, unique=True, blank=True)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['Name', 'Barangay']
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        self.Email = self.email  # Keep Email field in sync
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.Name} ({self.Email})"
    
    class Meta:
        db_table = 'users'
