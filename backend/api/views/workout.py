from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models.workout import Workout
from ..serializers.workout import WorkoutSerializer
import pprint
from rest_framework import viewsets

class WorkoutViewset(viewsets.ModelViewSet):
    
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        workout = Workout.objects.create(uuid=data['uuid'], workout_data=data['workout'])
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def list(self, request):
        print(pprint.pprint(dir(request.authenticators)))
        print(request.authenticators)
        serializer = WorkoutSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        uuid = kwargs['uuid']
        workout = get_object_or_404(self.queryset, uuid=uuid)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        workout = Workout.objects.get(id=pk).delete()
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)