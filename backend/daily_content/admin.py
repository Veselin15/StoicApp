from django.contrib import admin
from .models import DailyNugget

# This tells Django: "Show the DailyNugget table in the admin panel"
@admin.register(DailyNugget)
class DailyNuggetAdmin(admin.ModelAdmin):
    list_display = ('date', 'author', 'stoic_quote') # Columns to show in the list
    search_fields = ('stoic_quote', 'author')        # Search bar capability