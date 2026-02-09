from django.urls import path
from . import views

urlpatterns = [
    path('today/', views.get_todays_nugget),
]