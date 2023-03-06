from rest_framework.serializers import ModelSerializer
from ..models.workout import Workout


class WorkoutSerializer(ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'