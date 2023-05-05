from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='user_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.UserViewSet.as_view({'post': 'login'}), name='login'),
    path('register/', views.UserViewSet.as_view({'post': 'register'}), name='register'),
    path('privacy/', views.UserViewSet.as_view({'post': 'privacy'}), name='privacy'),
    path('units/', views.UserViewSet.as_view({'post': 'units'}), name='units'),
    path('query/', views.UserViewSet.as_view({'get': 'query'}), name='query'),    
    path('me/', views.UserViewSet.as_view({'get': 'me'}), name='me'),
]