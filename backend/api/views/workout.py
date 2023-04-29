from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.workout import Workout
from ..serializers.workout import WorkoutSerializer


class WorkoutViewset(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        workout = Workout.objects.create(
            uuid=data['uuid'], 
            user=user, 
            timestamp=data['timestamp'], 
            workout_data=data['workout']
        )
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def list(self, request):
        queryset = Workout.objects.filter(user=request.user)
        serializer = WorkoutSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        uuid = kwargs['uuid']
        workout = get_object_or_404(self.queryset, uuid=uuid)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass
    
    def destroy(self, request, pk):
        workout = get_object_or_404(self.queryset, pk=pk)
        self.perform_destroy(workout)
        return Response('hello')