from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.exercise import Exercise
from ..serializers.exercise import ExerciseSerializer

@api_view(['GET'])
def get_all_exercises(request):
    exercises = Exercise.objects.all()
    serializer = ExerciseSerializer(exercises, many=True)
    return Response(serializer.data)