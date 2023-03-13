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
        exclude = ['password']