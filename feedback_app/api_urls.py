from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import FeedbackViewSet

router = DefaultRouter()
router.register(r'feedback', FeedbackViewSet, basename='feedback')

urlpatterns = [
    path('api/', include(router.urls)),
]

