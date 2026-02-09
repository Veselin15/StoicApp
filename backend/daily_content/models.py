from django.db import models
import datetime

class DailyNugget(models.Model):
    date = models.DateField(default=datetime.date.today, unique=True)
    stoic_quote = models.TextField()
    author = models.CharField(max_length=100, default="Marcus Aurelius")
    daily_challenge = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.date} - {self.author}"


class JournalEntry(models.Model):
    date = models.DateField(auto_now_add=True)
    content = models.TextField()

    def __str__(self):
        return f"Journal - {self.date}"