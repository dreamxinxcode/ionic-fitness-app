from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewset, basename='user_viewset')

urlpatterns = [
    path('me/', views.me, name='me')
]