from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models.workout import Workout
from ..serializers.workout import WorkoutSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_new_workout(request):
    data = request.data
    Workout.objects.create(uuid=data['uuid'], workout_data=data['workout'])
    return Response('hello')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_workouts(request):
    workouts = Workout.objects.all()
    serializer = WorkoutSerializer(workouts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_workout(request, id):
    workout = Workout.objects.get(uuid=id)
    serializer = WorkoutSerializer(workout)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_workout(request, id):
    Workout.objects.get(uuid=id).delete()
    return Response('deleted')