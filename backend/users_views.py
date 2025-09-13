# views.py - Put this in your Django users app
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    """Register a new user - Pure Django"""
    try:
        data = request.data
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name', 'barangay']
        for field in required_fields:
            if field not in data or not data[field]:
                return Response({
                    'success': False,
                    'message': f'{field} is required'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=data['email']).exists():
            return Response({
                'success': False,
                'message': 'User with this email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create user
        user = User.objects.create(
            email=data['email'],
            username=data['email'],
            Email=data['email'],
            Name=f"{data['first_name']} {data['last_name']}",
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=make_password(data['password']),
            Role=data.get('role', 'User'),
            Barangay=data['barangay']
        )
        
        # Create authentication token
        token, created = Token.objects.get_or_create(user=user)
        
        # Return user data in your format
        user_data = {
            'UserID': str(user.UserID),
            'Name': user.Name,
            'Email': user.Email,
            'Role': user.Role,
            'Barangay': user.Barangay
        }
        
        return Response({
            'success': True,
            'message': 'User registered successfully',
            'user': user_data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Registration failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login_user(request):
    """Login user"""
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'success': False,
                'message': 'Email and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(username=email, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            
            user_data = {
                'UserID': str(user.UserID),
                'Name': user.Name,
                'Email': user.Email,
                'Role': user.Role,
                'Barangay': user.Barangay
            }
            
            return Response({
                'success': True,
                'message': 'Login successful',
                'user': user_data,
                'token': token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'success': False,
                'message': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Login failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def check_username(request):
    """Check if username is available"""
    try:
        username = request.data.get('username')
        
        if not username:
            return Response({
                'available': False,
                'message': 'Username is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if username exists
        available = not User.objects.filter(username=username).exists()
        
        return Response({
            'available': available,
            'message': 'Available' if available else 'Username already taken'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'available': False,
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def list_users(request):
    """List all users - for admin"""
    try:
        users = User.objects.all()
        users_data = []
        
        for user in users:
            users_data.append({
                'UserID': str(user.UserID),
                'Name': user.Name,
                'Email': user.Email,
                'Role': user.Role,
                'Barangay': user.Barangay
            })
        
        return Response({
            'success': True,
            'users': users_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
