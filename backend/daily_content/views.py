from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status  # <--- THIS WAS MISSING
from .models import DailyNugget, JournalEntry
from .serializers import DailyNuggetSerializer, JournalEntrySerializer
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
        return Response({
            "stoic_quote": "No content yet.",
            "author": "System",
            "daily_challenge": "Add data in admin panel."
        })


@api_view(['POST'])
def save_journal_entry(request):
    serializer = JournalEntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)