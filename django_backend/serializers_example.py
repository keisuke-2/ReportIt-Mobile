# Django Serializers (serializers.py)
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'UserID', 
            'Name', 
            'Email', 
            'Role', 
            'Barangay',
            'firebase_uid',
            'first_name',
            'last_name',
            'username',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class UserRegistrationSerializer(serializers.Serializer):
    """Serializer for user registration"""
    UserID = serializers.CharField(max_length=100)
    Name = serializers.CharField(max_length=300)
    Email = serializers.EmailField()
    Password = serializers.CharField(min_length=8)
    Role = serializers.ChoiceField(choices=[('User', 'User'), ('Admin', 'Admin')])
    Barangay = serializers.CharField(max_length=200)
    firebase_uid = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=150, required=False)
    last_name = serializers.CharField(max_length=150, required=False)
    username = serializers.CharField(max_length=150, required=False)
