from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from .models import CustomUser, Profile


user = get_user_model()

class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(max_length=30)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        Profile.objects.create(
            user=user,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        return user
    
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

