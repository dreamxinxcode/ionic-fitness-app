from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.db.models import Q
from django.shortcuts import get_object_or_404
from ..models.exercise import Exercise, ExerciseFavorites, MUSCLE_CHOICES_BASIC
from ..serializers.exercise import ExerciseSerializer, ExerciseCreateSerializer


class ExerciseViewSet(viewsets.ModelViewSet):

    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = ExerciseCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        exercise = serializer.save(user=request.user)
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)
    
    def list(self, request):
        user = request.user
        queryset = Exercise.objects.filter(Q(user=user) | Q(user=None)).order_by('name')
        serializer = ExerciseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        exercise = get_object_or_404(self.queryset, pk=pk)
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

    @action(detail=False, methods=['GET'])
    def by_user(self, request):
        user = request.user
        created_exercises = Exercise.objects.filter(user=user)
        favorite_exercises = Exercise.objects.filter(exercisefavorites__user=user)
        combined_queryset = created_exercises | favorite_exercises
        serializer = ExerciseSerializer(combined_queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def favorite(self, request):
        user = request.user
        exercise_name = request.data.get('name')
        try:
            exercise = Exercise.objects.get(name=exercise_name)
        except Exercise.DoesNotExist:
            return Response({'error': f'Exercise "{exercise_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        favorites, _ = ExerciseFavorites.objects.get_or_create(user=user)
        favorites.exercise.add(exercise)
        return Response({'success': f'Exercise "{exercise_name}" added to favorites.'})
    
    @action(detail=False, methods=['POST'])
    def unfavorite(self, request):
        user = request.user
        exercise_name = request.data.get('name')
        try:
            exercise = Exercise.objects.get(name=exercise_name)
        except Exercise.DoesNotExist:
            return Response({'error': f'Exercise "{exercise_name}" does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        favorites, _ = ExerciseFavorites.objects.get_or_create(user=user)
        favorites.exercise.remove(exercise)
        return Response({'success': f'Exercise "{exercise_name}" removed from favorites.'})
    
    @action(detail=False, methods=['GET'])
    def muscle_groups(self, request):
        muscle_groups = [mg[0] for mg in MUSCLE_CHOICES_BASIC]
        return Response(muscle_groups)