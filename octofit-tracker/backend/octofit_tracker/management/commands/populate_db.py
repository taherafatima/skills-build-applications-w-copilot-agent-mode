from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        try:
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()
            User.objects.all().delete()
            Team.objects.all().delete()
        except:
            pass  # Ignore errors if no data

        # Create Teams


        marvel = Team.objects.create(name='Team Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='Team DC', description='DC superheroes')

        # Create Users (team as string)
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team='Team Marvel')
        captain = User.objects.create(name='Captain America', email='captain@marvel.com', team='Team Marvel')
        batman = User.objects.create(name='Batman', email='batman@dc.com', team='Team DC')
        superman = User.objects.create(name='Superman', email='superman@dc.com', team='Team DC')

        # Create Activities (user as string reference)
        Activity.objects.create(user=ironman.email, activity_type='Run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=batman.email, activity_type='Swim', duration=45, date=timezone.now().date())

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', suggested_for='All')
        Workout.objects.create(name='Strength Training', description='Strength for all heroes', suggested_for='All')

        # Create Leaderboard (user as string reference)
        Leaderboard.objects.create(user=ironman.email, score=100, rank=1)
        Leaderboard.objects.create(user=batman.email, score=90, rank=2)

        # Ensure unique index on email field for users using pymongo
        client = MongoClient("mongodb://localhost:27017")
        db = client["octofit_db"]
        db["octofit_tracker_user"].create_index("email", unique=True)
        client.close()

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
