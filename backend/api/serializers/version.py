from rest_framework.serializers import ModelSerializer
from ..models.version import Version


class VersionSerializer(ModelSerializer):
    class Meta:
        model = Version
        fields = '__all__'