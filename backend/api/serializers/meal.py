from rest_framework.serializers import ModelSerializer
from ..models.meal import Meal


class MealSerializer(ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'