from rest_framework import serializers
from ..models.exercise import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'