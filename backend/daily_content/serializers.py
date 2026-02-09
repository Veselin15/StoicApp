from rest_framework import serializers
from .models import DailyNugget, JournalEntry

class DailyNuggetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyNugget
        fields = '__all__'


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'