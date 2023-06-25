from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Q
from ..models.meal import Meal, MealTag
from ..serializers.meal import MealSerializer, MealTagSerializer


class MealViewSet(viewsets.ModelViewSet):
    
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        pass

    def list(self, request):
        queryset = self.get_queryset().order_by('-timestamp')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MealSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MealSerializer(queryset, many=True)
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
    
    @action(detail=False, methods=['GET'])
    def tags(self, request):
        tags = MealTag.objects.all()
        serializer = MealTagSerializer(tags, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def filter_by_tags(self, request):
        # Get the tags parameter from the request query string
        tags = request.query_params.getlist('tags')
        # Filter meals by the tags
        meals = Meal.objects.filter(tags__title__in=tags)
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data)
    

    def get_queryset(self):
        queryset = Meal.objects.all()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(Q(title__icontains=query))
        return queryset