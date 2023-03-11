from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewset, basename='user_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.UserViewset.as_view({'post': 'register'}), name='register'),
    path('me/', views.UserViewset.as_view({'get': 'me'}), name='me'),
    path('recent/', views.UserViewset.as_view({'get': 'recent_users'}), name='recent_users'),  
    path('query/', views.UserViewset.as_view({'get': 'query'}), name='query'), 
]