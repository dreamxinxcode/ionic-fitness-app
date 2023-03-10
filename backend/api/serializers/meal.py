from rest_framework.serializers import ModelSerializer
from ..models.meal import Meal, MealTag


class MealTagSerializer(ModelSerializer):
    class Meta:
        model = MealTag
        fields = '__all__'

class MealSerializer(ModelSerializer):
    tags = MealTagSerializer(many=True)

    class Meta:
        model = Meal
        fields = '__all__'