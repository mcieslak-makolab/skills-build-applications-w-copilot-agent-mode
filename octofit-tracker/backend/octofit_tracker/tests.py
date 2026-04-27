from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name='Test', email='test@example.com', team='marvel')
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'marvel')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='marvel', description='Marvel team')
        self.assertEqual(team.name, 'marvel')
        self.assertEqual(team.description, 'Marvel team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test', type='run', duration=30, date='2024-01-01')
        self.assertEqual(activity.type, 'run')
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(user='Test', score=100)
        self.assertEqual(lb.user, 'Test')
        self.assertEqual(lb.score, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups', description='Do pushups', difficulty='easy')
        self.assertEqual(workout.name, 'Pushups')
        self.assertEqual(workout.difficulty, 'easy')
