from rest_framework.serializers import ModelSerializer
from .models import CustomUser, Profile



class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['user']


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = CustomUser
        related_object = 'profile'
        fields = ['profile', 'email', 'username', 'last_login', 'date_joined', 'is_active', 'is_staff']

