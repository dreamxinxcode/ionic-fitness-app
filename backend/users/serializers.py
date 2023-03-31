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

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = CustomUser.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user