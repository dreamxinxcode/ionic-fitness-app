from rest_framework.serializers import ModelSerializer
from ..models.exercise import Exercise


class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'