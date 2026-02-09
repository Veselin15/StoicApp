from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DailyNugget
from .serializers import DailyNuggetSerializer
import datetime


@api_view(['GET'])
def get_todays_nugget(request):
    # Get today's quote, or the latest one if today is missing
    today = datetime.date.today()
    nugget = DailyNugget.objects.filter(date=today).first()

    if not nugget:
        nugget = DailyNugget.objects.order_by('-date').first()

    if nugget:
        serializer = DailyNuggetSerializer(nugget)
        return Response(serializer.data)
    else:
        return Response(
            {"stoic_quote": "No content yet.", "author": "System", "daily_challenge": "Add data in admin panel."})