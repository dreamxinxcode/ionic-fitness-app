from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models.workout import Workout
from ..serializers.workout import WorkoutSerializer

from rest_framework import viewsets

class WorkoutViewset(viewsets.ModelViewSet):
    
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Workout.objects.create(uuid=data['uuid'], workout_data=data['workout'])
        return

    def list(self, request):
        serializer = WorkoutSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        workout = get_object_or_404(self.queryset, pk=pk)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        Workout.objects.get(uuid=id).delete()
