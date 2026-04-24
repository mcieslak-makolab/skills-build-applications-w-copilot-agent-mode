from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel team')
        dc = Team.objects.create(name='dc', description='DC team')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel.name)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel.name)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc.name)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc.name)

        # Create activities
        Activity.objects.create(user=tony.name, type='run', duration=30, date=date(2024, 1, 1))
        Activity.objects.create(user=steve.name, type='swim', duration=45, date=date(2024, 1, 2))
        Activity.objects.create(user=bruce.name, type='cycle', duration=60, date=date(2024, 1, 3))
        Activity.objects.create(user=clark.name, type='fly', duration=120, date=date(2024, 1, 4))

        # Create leaderboard
        Leaderboard.objects.create(user=tony.name, score=100)
        Leaderboard.objects.create(user=steve.name, score=90)
        Leaderboard.objects.create(user=bruce.name, score=110)
        Leaderboard.objects.create(user=clark.name, score=120)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do pushups', difficulty='easy')
        Workout.objects.create(name='Situps', description='Do situps', difficulty='easy')
        Workout.objects.create(name='Squats', description='Do squats', difficulty='medium')
        Workout.objects.create(name='Deadlift', description='Heavy deadlift', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
