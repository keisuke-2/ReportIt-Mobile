import os
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def signup(request):
    """Create a new Firebase user via REST API.
    Expects JSON: { email, password }
    """
    try:
        api_key = settings.FIREBASE_API_KEY
        if not api_key:
            return Response({'detail': 'FIREBASE_API_KEY not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'detail': 'email and password required'}, status=status.HTTP_400_BAD_REQUEST)

        url = f'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={api_key}'
        payload = {'email': email, 'password': password, 'returnSecureToken': True}
        resp = requests.post(url, json=payload)
        return Response(resp.json(), status=resp.status_code)
    except Exception as e:
        # log to a file for debugging
        try:
            with open('/home/isaac/ReportIt/ReportIt-Mobile/backend/error.log', 'a') as fh:
                fh.write('SIGNUP ERROR:\n')
                import traceback
                fh.write(traceback.format_exc())
                fh.write('\n')
        except Exception:
            pass
        return Response({'detail': 'internal server error', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login(request):
    """Sign in with email/password via Firebase REST API.
    Expects JSON: { email, password }
    Returns the Firebase idToken and user info on success.
    """
    try:
        api_key = settings.FIREBASE_API_KEY
        if not api_key:
            return Response({'detail': 'FIREBASE_API_KEY not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'detail': 'email and password required'}, status=status.HTTP_400_BAD_REQUEST)

        url = f'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}'
        payload = {'email': email, 'password': password, 'returnSecureToken': True}
        resp = requests.post(url, json=payload)
        return Response(resp.json(), status=resp.status_code)
    except Exception as e:
        try:
            with open('/home/isaac/ReportIt/ReportIt-Mobile/backend/error.log', 'a') as fh:
                fh.write('LOGIN ERROR:\n')
                import traceback
                fh.write(traceback.format_exc())
                fh.write('\n')
        except Exception:
            pass
        return Response({'detail': 'internal server error', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
