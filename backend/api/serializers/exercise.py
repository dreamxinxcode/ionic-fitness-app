from rest_framework.serializers import ModelSerializer
from ..models.exercise import Exercise


class ExerciseCreateSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['name', 'muscle_group', 'user']

class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        exclude = ['id']
