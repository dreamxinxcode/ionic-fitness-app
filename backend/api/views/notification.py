from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from ..models.notification import Notification
from ..serializers.notification import NotificationSerializer


@api_view(['GET'])
def for_user(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    try:
        queryset = Notification.objects.filter(Q(user=request.user) | Q(user__isnull=True)).order_by('-created_at')
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = NotificationSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data) 
    except Notification.DoesNotExist:
        return Response([])