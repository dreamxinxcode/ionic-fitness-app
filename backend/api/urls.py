from django.urls import path, include
from .views import exercise, workout, meal, version, moment, template, notification, analytics
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('exercises', exercise.ExerciseViewSet, basename='exercise_viewSet')
router.register('workouts', workout.WorkoutViewSet, basename='workout_viewSet')
router.register('meals', meal.MealViewSet, basename='meal_viewSet')
router.register('moments', moment.MomentViewSet, basename='moment_viewSet')
router.register('templates', template.TemplateViewSet, basename='template_viewSet')
router.register('analytics', analytics.AnalyticsViewSet, basename='analytics_viewSet')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('version/<str:os>/', version.version, name='version'),
    path('notifications/', notification.for_user, name='for_user'),
    path('workouts/targets/<str:exercise>/', workout.WorkoutViewSet.as_view({'get': 'targets'}), name='targets'),
    path('workouts/for_user/<int:pk>/', workout.WorkoutViewSet.as_view({'get': 'for_user'}), name='for_user'),
    path('meals/tags/', meal.MealViewSet.as_view({'get': 'tags'}), name='tags'),
    path('meals/filter_by_tags/', meal.MealViewSet.as_view({'get': 'filter_by_tags'}), name='meal_filter_by_tags'),
    path('moments/by_user/<int:pk>/', moment.MomentViewSet.as_view({'get': 'by_user'}), name='by_user'),
    path('exercises/by_user/', exercise.ExerciseViewSet.as_view({'get': 'by_user'}), name='by_user'),
    path('exercises/favorite/', exercise.ExerciseViewSet.as_view({'post': 'favorite'}), name='favorite'),
    path('exercises/unfavorite/', exercise.ExerciseViewSet.as_view({'post': 'unfavorite'}), name='unfavorite'),
    path('analytics/exercises_done/', analytics.AnalyticsViewSet.as_view({'get': 'exercises_done'}), name='exercises_done'),
    path('analytics/most_frequent/', analytics.AnalyticsViewSet.as_view({'get': 'most_frequent'}), name='most_frequent'),
    path('muscle-groups/', exercise.ExerciseViewSet.as_view({'get': 'muscle_groups'}), name='muscle_groups'),
]