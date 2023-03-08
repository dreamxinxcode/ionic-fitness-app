from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models.version import Version
from ..serializers.version import VersionSerializer


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def version(request):
    user_os = request.data['os']
    version = get_object_or_404(Version, os=user_os)
    data = VersionSerializer(version).data
    return Response(data)