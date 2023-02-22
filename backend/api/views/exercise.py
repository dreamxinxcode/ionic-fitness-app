from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from ..models.exercise import Exercise
from ..serializers.exercise import ExerciseSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_exercises(request):
    exercises = Exercise.objects.all()
    serializer = ExerciseSerializer(exercises, many=True)
    return Response(serializer.data)


class ExerciseViewSet(viewsets.ModelViewSet):

    def list(self, request):
        queryset = Exercise.objects.all()
        serializer = ExerciseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        exercise = Exercise.objects.get_object_or_404(pk=pk)
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
