from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes


class BaseViewSet(viewsets.ModelViewSet):
        permission_classes = [IsAuthenticated]
