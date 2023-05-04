from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from ..models.notification import Notification
from ..serializers.notification import NotificationSerializer


@api_view(['GET'])
def for_user(request):
    try:
        queryset = Notification.objects.filter(Q(user=request.user) | Q(user__isnull=True)).order_by('-created_at')
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data) 
    except Notification.DoesNotExist:
        return Response([])