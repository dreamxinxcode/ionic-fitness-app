from django.urls import path, include
from .views import exercise, workout
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('exercise', exercise.ExerciseViewSet, basename='exercise_viewset')
router.register('workout', workout.WorkoutViewset, basename='workout_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]