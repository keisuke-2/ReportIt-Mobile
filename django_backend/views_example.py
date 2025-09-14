# Django Views (views.py)
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import UserSerializer
import json

@api_view(['POST'])
def register_user(request):
    """Register a new user"""
    try:
        data = request.data
        
        # Validate required fields
        required_fields = ['UserID', 'Name', 'Email', 'Password', 'Role', 'Barangay', 'firebase_uid']
        for field in required_fields:
            if field not in data:
                return Response({
                    'success': False,
                    'message': f'{field} is required'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if CustomUser.objects.filter(email=data['Email']).exists():
            return Response({
                'success': False,
                'message': 'User with this email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(firebase_uid=data['firebase_uid']).exists():
            return Response({
                'success': False,
                'message': 'User with this Firebase UID already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new user
        user = CustomUser.objects.create(
            UserID=data['UserID'],
            Name=data['Name'],
            email=data['Email'],
            Email=data['Email'],  # For consistency with your table
            password=make_password(data['Password']),  # Hash the password
            Role=data['Role'],
            Barangay=data['Barangay'],
            firebase_uid=data['firebase_uid'],
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            username=data['Email']  # Use email as username
        )
        
        # Serialize user data
        serializer = UserSerializer(user)
        
        return Response({
            'success': True,
            'message': 'User registered successfully',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Registration failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def verify_user(request):
    """Verify user exists in Django backend"""
    try:
        firebase_uid = request.data.get('firebase_uid')
        email = request.data.get('email')
        
        if not firebase_uid:
            return Response({
                'success': False,
                'message': 'Firebase UID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find user by Firebase UID
        try:
            user = CustomUser.objects.get(firebase_uid=firebase_uid)
            serializer = UserSerializer(user)
            
            return Response({
                'success': True,
                'user': serializer.data
            }, status=status.HTTP_200_OK)
            
        except CustomUser.DoesNotExist:
            return Response({
                'success': False,
                'message': 'User not found in Django backend'
            }, status=status.HTTP_404_NOT_FOUND)
            
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Verification failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user(request, firebase_uid):
    """Get user by Firebase UID"""
    try:
        user = CustomUser.objects.get(firebase_uid=firebase_uid)
        serializer = UserSerializer(user)
        
        return Response({
            'success': True,
            'user': serializer.data
        }, status=status.HTTP_200_OK)
        
    except CustomUser.DoesNotExist:
        return Response({
            'success': False,
            'message': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def list_users(request):
    """List all users (Admin only)"""
    try:
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        
        return Response({
            'success': True,
            'users': serializer.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
