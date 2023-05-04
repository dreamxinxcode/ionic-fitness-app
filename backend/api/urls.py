from django.urls import path, include
from .views import exercise, workout, meal, version, moment, template, notification
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('exercises', exercise.ExerciseViewSet, basename='exercise_viewset')
router.register('workouts', workout.WorkoutViewset, basename='workout_viewset')
router.register('meals', meal.MealViewset, basename='meal_viewset')
router.register('moments', moment.MomentViewset, basename='moment_viewset')
router.register('templates', template.TemplateViewset, basename='template_viewset')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('version/<str:os>/', version.version, name='version'),
    path('notifications/', notification.for_user, name='for_user'),
    path('workouts/targets/<str:exercise>/', workout.WorkoutViewset.as_view({'get': 'targets'}), name='targets'),
    path('workouts/for_user/<int:pk>/', workout.WorkoutViewset.as_view({'get': 'for_user'}), name='for_user'),
    path('meals/tags/', meal.MealViewset.as_view({'get': 'tags'}), name='tags'),
    path('meals/filter_by_tags/', meal.MealViewset.as_view({'get': 'filter_by_tags'}), name='meal_filter_by_tags'),
    path('moments/by_user/<int:pk>/', moment.MomentViewset.as_view({'get': 'by_user'}), name='by_user'),
]