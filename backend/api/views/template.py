from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models.template import Template
from ..serializers.template import TemplateSerializer


class TemplateViewset(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        print(data)
        template = Template.objects.create(
            user=user,
            title=data['title'],
            timestamp=data['timestamp'], 
            data=data['template']
        )
        serializer = TemplateSerializer(template)
        return Response(serializer.data)

    def list(self, request):
        queryset = Template.objects.filter(user=request.user)
        serializer = TemplateSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        uuid = kwargs['uuid']
        template = get_object_or_404(self.queryset, uuid=uuid)
        serializer = TemplateSerializer(Template)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass
    
    def destroy(self, request, pk):
        template = get_object_or_404(self.queryset, pk=pk)
        self.perform_destroy(Template)
        return Response('hello')