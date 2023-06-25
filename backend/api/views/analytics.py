from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Sum, F
from django.http import JsonResponse
from ..models.exercise import Exercise
from ..models.set import Set
from ..serializers.exercise import ExerciseSerializer
from ..serializers.workout import SetSerializer

# TODO: GET all anayltics with one request
class AnalyticsViewSet(ViewSet):
    
    @action(detail=False, methods=['GET'])
    def exercises_done(self, request):
        user = request.user
        exercises = Exercise.objects.filter(set__user=request.user).distinct()
        serializer = ExerciseSerializer(exercises, many=True)
        return JsonResponse(serializer.data, safe=False)

    @action(detail=False, methods=['GET'])
    def most_frequent(self, request):
        user = request.user
        sets = Set.objects.select_related('exercise').filter(user=user)
        exercise_stats = sets.values('exercise__name').annotate(
            exercise=F('exercise__name'),
            total_sets=Count('exercise'),
            total_reps=Sum('reps')
        ).order_by('-total_sets')
        response_data = [
            {
                'exercise': stat['exercise'],
                'sets': stat['total_sets'],
                'reps': stat['total_reps']
            }
            for stat in exercise_stats
        ]
        return JsonResponse(response_data, safe=False)
    
    @action(detail=False, methods=['GET'])
    def get_prs(self, request):
        user = request.user
        exercise = request.query_params.get('exercise')
        pr_weight = SetSerializer(
            Set.objects.filter(user=user, exercise__name=exercise).order_by('-weight').first(), 
            many=False
          )
        pr_reps = SetSerializer(
            Set.objects.filter(user=user, exercise__name=exercise).order_by('-reps').first(), 
            many=False
          )
        return Response({ 'pr_weight': pr_weight.data, 'pr_reps': pr_reps.data })
    
    @action(detail=False, methods=['GET'])
    def sets(self, request):
        user = request.user
        exercise = request.query_params.get('exercise')
        queryset = Set.objects.filter(user=user, exercise__name=exercise).order_by('-timestamp')
        serializer = SetSerializer(queryset, many=True)
        return Response(serializer.data)