from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from ..models.exercise import Exercise
from ..serializers.exercise import ExerciseSerializer, ExerciseCreateSerializer


class ExerciseViewSet(viewsets.ModelViewSet):

    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = ExerciseCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        exercise = serializer.save()
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)

    def list(self, request):
        queryset = Exercise.objects.all().order_by('name')
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

    def destroy(self, request, pk=None):
        pass
