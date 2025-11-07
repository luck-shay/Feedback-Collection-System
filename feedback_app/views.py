from django.urls import reverse_lazy
from django.views import generic
from .models import Feedback
from .forms import FeedbackForm
from django.utils.http import urlencode

class FeedbackListView(generic.ListView):
    model = Feedback
    template_name = "feedback_app/feedback_list.html"
    context_object_name = "feedback_list"
    paginate_by = 10

    def get_queryset(self):
        qs = Feedback.objects.all()
        name = self.request.GET.get("name")
        rating = self.request.GET.get("rating")
        if name:
            qs = qs.filter(name__icontains=name)
        if rating:
            try:
                r = int(rating)
                qs = qs.filter(rating=r)
            except ValueError:
                pass
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # preserve other GET params (except page) for pagination links and to refill the filter form
        params = self.request.GET.copy()
        if "page" in params:
            params.pop("page")
        context["query_string"] = params.urlencode()
        context["current_filters"] = {
            "name": self.request.GET.get("name", ""),
            "rating": self.request.GET.get("rating", ""),
        }
        # provide a simple list of rating values to iterate in the template
        context["ratings"] = [str(r[0]) for r in Feedback.RATING_CHOICES]
        return context

class FeedbackDetailView(generic.DetailView):
    model = Feedback
    template_name = "feedback_app/feedback_detail.html"
    context_object_name = "feedback"

class FeedbackCreateView(generic.CreateView):
    model = Feedback
    form_class = FeedbackForm
    template_name = "feedback_app/feedback_form.html"
    success_url = reverse_lazy("feedback_list")

class FeedbackUpdateView(generic.UpdateView):
    model = Feedback
    form_class = FeedbackForm
    template_name = "feedback_app/feedback_form.html"
    success_url = reverse_lazy("feedback_list")

class FeedbackDeleteView(generic.DeleteView):
    model = Feedback
    template_name = "feedback_app/feedback_confirm_delete.html"
    success_url = reverse_lazy("feedback_list")