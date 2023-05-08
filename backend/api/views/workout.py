from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.workout import Workout
from ..models.exercise import Exercise
from ..models.set import Set
from ..serializers.workout import WorkoutSerializer
from ..pagination import StandardResultsSetPagination

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user

        workout = Workout.objects.create(
            uuid=data['uuid'], 
            user=user, 
            timestamp=data['timestamp'], 
        )

        # Create set objects
        for exercise in data['workout']:
            for set in exercise['sets']:
                Set.objects.create(
                    user=user, 
                    workout=workout, 
                    exercise=Exercise.objects.get(name=exercise['name']), 
                    weight=set['weight'], 
                    reps=set['reps']
                )

        serializer = WorkoutSerializer(workout)
        return Response(serializer.data)

    def list(self, request):
        queryset = Workout.objects.filter(user=request.user).order_by('-timestamp')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = WorkoutSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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
    
    @action(detail=False, methods=['GET'])
    def targets(self, request, exercise):
        print(exercise)
        return Response('Herllo')
    
    @action(detail=False, methods=['GET'])
    def for_user(self, request, pk=None):
        queryset = self.queryset.filter(user=pk)
        serializer = WorkoutSerializer(queryset, many=True)
        return Response(serializer.data)