from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from ..models.version import Version
from ..serializers.version import VersionSerializer


@api_view(['POST'])
def version(request):
    print('hello')
    user_os = request.data['os']
    version = get_object_or_404(Version, os=user_os)
    data = VersionSerializer(version).data
    return Response(data)