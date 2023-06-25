from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import CustomUser, Profile, Ban
from .serializers import UserSerializer, ProfileSerializer, BanSerializer


class UserViewSet(viewsets.ModelViewSet):
    
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        user = get_object_or_404(self.queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['PUT'])
    def save_profile(self, request):
        user = request.user
        profile = get_object_or_404(Profile, user=user)
        serializer = ProfileSerializer(instance=profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
             ban = Ban.objects.get(user=user)
             serializer = BanSerializer(ban)
             return Response({'error': 'User is banned', 'ban_data': serializer.data}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate a JWT token for the user
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Return a success response with the JWT token
        return Response(token, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "email": user.email,
                "message": "User registered successfully.",
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=['POST'])
    def save_privacy_settings(self, request):
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
        serializer = UserSerializer(instance=user, data=settings, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        