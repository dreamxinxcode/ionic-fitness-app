from rest_framework.serializers import ModelSerializer
from ..models.set import Set
from exercise import ExerciseSerializer

class SetSerializer(ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = Set
        fields = '__all__'