from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes


class BaseViewset(viewsets.ModelViewset):
        permission_classes = [IsAuthenticated]
