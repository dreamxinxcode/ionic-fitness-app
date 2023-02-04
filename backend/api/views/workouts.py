from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.exercise import Exercise
from ..serializers.exercise import ExerciseSerializer

@api_view(['POST'])
def add_new_workout(request):
    print(request.data)
    return Response('hello')