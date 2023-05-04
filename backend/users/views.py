from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import CustomUser, Profile
from .serializers import UserSerializer, ProfileSerializer


class UserViewset(viewsets.ModelViewSet):
    
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def list(self):
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        print('hellooo')
        user = get_object_or_404(self.queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def query(self, request):
        query = request.query_params.get('q')
        if not query:
            return Response({'error': 'Please provide a search query.'}, status=400)

        queryset = self.queryset.filter(
            Q(profile__first_name__icontains=query) |
            Q(profile__last_name__icontains=query) |
            Q(username__icontains=query)
        )
        
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def me(self, request):
        id = request.user.id
        user = get_object_or_404(CustomUser, id=id)
        return Response(UserSerializer(user).data)

    @action(detail=False, methods=['POST'])
    def login(self, request):
        # Get the email and password from the request data
        email = request.data.get('email')
        password = request.data.get('password')
        # Authenticate the user
        user = authenticate(email=email, password=password)

        # If authentication fails, return an error response
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # If user is banned
        if user.is_banned:
             return Response({'error': 'User is banned'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate a JWT token for the user
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Return a success response with the JWT token
        return Response(token, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        data = request.data
        user_data = {
            'username': data['username'],
            'email': data['email'],
            'password': data['password'],
        }
        # profile_data = data['profile']
        profile_data = {
            'first_name': data['profile']['first_name'],
            'last_name': data['profile']['last_name'],
            'country': data['profile']['country'],
            'city': data['profile']['city'],
            # 'avatar': data['avatar'],
        }
        user_serializer = UserSerializer(data=data)
        profile_serializer = ProfileSerializer(data=profile_data)
        if user_serializer.is_valid() and profile_serializer.is_valid():
            user_serializer.save()
            profile_serializer.save()
            return Response(user_serializer.data)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def privacy(self, request):
        settings = request.data
        user = get_object_or_404(CustomUser, id=request.user.id)
        user_serializer = UserSerializer(instance=user, data=settings, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['POST'])
    def units(self, request):
        settings = request.data
        user = get_object_or_404(CustomUser, id=request.user.id)
        profile = get_object_or_404(Profile, user=user)
        profile_serializer = ProfileSerializer(instance=profile, data=settings, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data)
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 