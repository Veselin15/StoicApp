from rest_framework import serializers
from .models import DailyNugget

class DailyNuggetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyNugget
        fields = '__all__'