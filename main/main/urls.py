from django.contrib import admin
from django.urls import path, include
from core.views import index, HealthView, StorageListCreateView, StorageDetailView

urlpatterns = [
    path("", index, name="home"),
    path("admin/", admin.site.urls),
    path("api/health/", HealthView.as_view(), name="api-health"),
    path("api/", include("core.url")),
    path("api/storages/<str:recurso>", StorageListCreateView.as_view(), name="storage-list-create"),
    path("api/storages/<str:recurso>/<str:record_id>", StorageDetailView.as_view(), name="storage-detail"),
]
