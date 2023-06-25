from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', views.UserViewSet, basename='user_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.UserViewSet.as_view({'post': 'login'}), name='login'),
    path('register/', views.UserViewSet.as_view({'post': 'register'}), name='register'),
    path('save_profile/', views.UserViewSet.as_view({'put': 'save_profile'}), name='save_profile'),
    path('privacy/', views.UserViewSet.as_view({'post': 'save_privacy_settings'}), name='save_privacy_settings'),
    path('units/', views.UserViewSet.as_view({'post': 'units'}), name='units'),
    path('query/', views.UserViewSet.as_view({'get': 'query'}), name='query'),    
    path('me/', views.UserViewSet.as_view({'get': 'me'}), name='me'),
]