from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.meal import Meal
from ..serializers.meal import MealSerializer


class MealViewset(viewsets.ModelViewSet):
    
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        pass

    def list(self, request):
        serializer = MealSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        uuid = kwargs['uuid']
        meal = get_object_or_404(self.queryset, uuid=uuid)
        serializer = MealSerializer(meal)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        meal = Meal.objects.get(id=pk).delete()
        serializer = MealSerializer(meal)
        return Response(serializer.data)