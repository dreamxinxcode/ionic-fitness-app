from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.moment import Moment
from ..serializers.moment import MomentSerializer
from ..pagination import SmallResultsSetPagination, StandardResultsSetPagination
from users.models import CustomUser


class MomentViewSet(viewsets.ModelViewSet):
    
    queryset = Moment.objects.all()
    serializer_class = MomentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        moment = Moment.objects.create(user=user, text=data['text'])
        serializer = MomentSerializer(moment)
        return Response(serializer.data)

    def list(self, request):
        queryset = Moment.objects.all().order_by('-timestamp')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MomentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MomentSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        uuid = kwargs['uuid']
        moment = get_object_or_404(self.queryset, uuid=uuid)
        serializer = MomentSerializer(moment)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        moment = Moment.objects.get(id=pk).delete()
        serializer = MomentSerializer(moment)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def by_user(self, request, pk=None):
        queryset = self.queryset.filter(user=pk).order_by('-timestamp')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MomentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MomentSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def get_pagination_class(self):
        if self.action == 'by_user':
            return SmallResultsSetPagination
        return self.pagination_class