from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from ..models.version import Version
from ..serializers.version import VersionSerializer


@api_view(['GET'])
def version(request, os):
    version = get_object_or_404(Version, os=os)
    serializer = VersionSerializer(version)
    return Response(serializer.data)