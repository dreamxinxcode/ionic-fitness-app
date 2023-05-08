from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models.workout import Workout
from ..models.set import Set
from ..serializers.exercise import ExerciseSerializer
from collections import defaultdict

class SetSerializer(ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = Set
        fields = '__all__'


class WorkoutSerializer(ModelSerializer):
    sets = SetSerializer(many=True)

    class Meta:
        model = Workout
        fields = ('id', 'uuid', 'user', 'timestamp', 'sets')
