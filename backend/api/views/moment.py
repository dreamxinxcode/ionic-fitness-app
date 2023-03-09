from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.moment import Moment
from ..serializers.moment import MomentSerializer
from users.models import CustomUser


class MomentViewset(viewsets.ModelViewSet):
    
    queryset = Moment.objects.all()
    serializer_class = MomentSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        moment = Moment.objects.create(uuid=data['uuid'], user=user, Moment_data=data['moment'])
        serializer = MomentSerializer(moment)
        return Response(serializer.data)

    def list(self, request):
        queryset = Moment.objects.all()
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