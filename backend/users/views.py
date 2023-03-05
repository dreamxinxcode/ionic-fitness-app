from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import CustomUser, Profile
from .serializers import UserSerializer


def login(request):
    pass


def logout(request):
    pass


@api_view(['POST'])
def register(request):
    data = request.data
    print(request.data)
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
    return Response('hello')

@api_view(['GET'])
def me(request):
    id = request.user.id
    user = get_object_or_404(CustomUser, id=id)
    return Response(UserSerializer(user).data)

class UserViewset(viewsets.ModelViewSet):

    def list(self):
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        id = kwargs['uuid']
        user = get_object_or_404(self.queryset, id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


