from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewset, basename='user_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('me/', views.UserViewset.as_view({'get': 'me'}), name='me'),
    path('query/', views.UserViewset.as_view({'get': 'query'}), name='query'),    
]