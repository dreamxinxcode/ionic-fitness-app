from django.urls import path, include
from .views import exercise, workout, meal, version
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('exercises', exercise.ExerciseViewSet, basename='exercise_viewset')
router.register('workouts', workout.WorkoutViewset, basename='workout_viewset')
router.register('meals', meal.MealViewset, basename='meal_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('version/', version.version, name='version'),    
]