from rest_framework.serializers import ModelSerializer
from ..models.template import Template


class TemplateSerializer(ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'