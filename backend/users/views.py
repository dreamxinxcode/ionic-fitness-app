from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser, Profile
from .serializers import UserSerializer


def login(request):
    pass


def logout(request):
    pass


@api_view(['POST'])
def register(request):
    data = request.data
    user = CustomUser.objects.create(
        email=data['email'],
        password=data['password'],
        username=data['username'],
    )
    Profile.objects.create(
        user=CustomUser.objects(id=user.id)
    ) 
    return Response('hello')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
