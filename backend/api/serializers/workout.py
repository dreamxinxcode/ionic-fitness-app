from rest_framework.serializers import ModelSerializer, SerializerMethodField
from ..models.workout import Workout
from ..models.set import Set
from ..serializers.exercise import ExerciseSerializer
from collections import defaultdict

class SetSerializer(ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = Set
        fields = '__all__'


class WorkoutSerializer(ModelSerializer):
    workout_data = SerializerMethodField()

    class Meta:
        model = Workout
        fields = ('id', 'uuid', 'user', 'timestamp', 'workout_data')

    def get_workout_data(self, obj):
        sets = obj.sets.order_by('timestamp')
        workout_data = []

        current_exercise = None
        current_sets = []

        for set_obj in sets:
            exercise_name = set_obj.exercise.name

            if current_exercise and exercise_name != current_exercise:
                workout_data.append({
                    'exercise': current_exercise,
                    'sets': current_sets
                })
                current_sets = []

            set_data = {
                'weight': set_obj.weight,
                'reps': set_obj.reps,
                'timestamp': set_obj.timestamp
            }
            current_sets.append(set_data)
            current_exercise = exercise_name

        if current_exercise:
            workout_data.append({
                'exercise': current_exercise,
                'sets': current_sets
            })

        return workout_data
