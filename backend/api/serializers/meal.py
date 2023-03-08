from rest_framework.serializers import ModelSerializer
from ..models.meal import Meal, Tag


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class MealSerializer(ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Meal
        fields = '__all__'