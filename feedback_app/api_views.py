from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'message']
    ordering_fields = ['created_at', 'rating', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Feedback.objects.all()
        rating = self.request.query_params.get('rating', None)
        name = self.request.query_params.get('name', None)
        
        if rating:
            try:
                queryset = queryset.filter(rating=int(rating))
            except ValueError:
                pass
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        return queryset

