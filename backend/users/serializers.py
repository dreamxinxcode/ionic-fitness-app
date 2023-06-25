from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import Profile, Ban

User = get_user_model()

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'avatar', 'birthdate', 'country', 'country_code', 'city', 'workout_count', 'moments_count', 'bio')


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            'profile',
            'email',
            'password',
            'username',
            'is_staff',
            'is_active',
            'date_joined',
            'ip',
            'is_banned',
            'is_paid',
            'show_first_name',
            'show_last_name',
            'show_age',
            'show_weight',
            'show_height',
            'show_workouts',
            'units_weight',
            'units_height',
            'pr',
        )


    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        
        if 'password' not in validated_data:
            raise KeyError('Password is missing in validated_data')

        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user


class BanSerializer(ModelSerializer):
    class Meta:
        model = Ban
        fields = ['user', 'reason', 'permanent', 'expires']