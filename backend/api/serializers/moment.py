from rest_framework.serializers import ModelSerializer
from ..models.moment import Moment
from users.serializers import UserSerializer

class MomentSerializer(ModelSerializer):
    user = UserSerializer(ModelSerializer)
    
    class Meta:
      model = Moment
      fields = '__all__'