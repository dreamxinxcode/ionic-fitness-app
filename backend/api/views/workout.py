from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.workout import Workout
from ..serializers.workout import WorkoutSerializer

@api_view(['POST'])
def add_new_workout(request):
    data = request.data
    Workout.objects.create(uuid=data['uuid'], workout_data=data['workout'])
    return Response('hello')

@api_view(['GET'])
def get_all_workouts(request):
    workouts = Workout.objects.all()
    serializer = WorkoutSerializer(workouts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_workout(request, id):
    print('hellooooo')
    workout = Workout.objects.get(uuid=id)
    serializer = WorkoutSerializer(workout)
    return Response(serializer.data)