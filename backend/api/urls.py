from django.urls import path
from .views import exercise, workout
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register('exercise', exercise.ExerciseViewSet, base_name='exercise_viewset')

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('exercises', exercise.get_all_exercises, name='get_all_exercises'),
    path('workouts', workout.get_all_workouts, name='get_all_workouts'),    
    path('workout/<uuid:id>', workout.get_workout, name='get_workout'),
    path('workout/delete/<uuid:id>', workout.delete_workout, name='delete_workout'),
    path('workout', workout.add_new_workout, name='add_new_workout'),
]