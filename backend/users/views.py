from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import CustomUser, Profile
from .serializers import UserSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def list(self):
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        id = kwargs['uuid']
        user = get_object_or_404(self.queryset, id=id)
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
        # Get the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)

        # If authentication fails, return an error response
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

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
        user = CustomUser.objects.create(
            email=data['email'],
            password=data['password'],
            username=data['username'],
        )
        Profile.objects.create(
            user = user,
            first_name=data['first_name'],
            last_name=data['last_name'],
        ) 
        return Response(user)