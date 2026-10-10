from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import User, ActivoUniversidad, OrdenActivo, HistorialActivo
from .serializers import UserSerializer, ActivoUniversidadSerializer, OrdenActivoSerializer, HistorialActivoSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer

RESOURCE_MAP = {
    "activos_universidad": (ActivoUniversidad, ActivoUniversidadSerializer),
    "ordenes_activos": (OrdenActivo, OrdenActivoSerializer),
    "historial_activos": (HistorialActivo, HistorialActivoSerializer),
}

def index(request):
    return render(request, "core/index.html")

class HealthView(APIView):
    def get(self, request):
        return Response({"status": "ok", "service": "proyecto-mn-atlas"})

class StorageListCreateView(APIView):
    """API compatible con la interfaz Atlas: lista y crea registros."""
    def get_model(self, recurso):
        item = RESOURCE_MAP.get(recurso)
        if not item:
            raise NotFound("Recurso no encontrado")
        return item

    def get(self, request, recurso):
        model, serializer_class = self.get_model(recurso)
        qs = model.objects.all()
        data = serializer_class(qs, many=True).data
        return Response({"items": data, "total": len(data)})

    def post(self, request, recurso):
        model, serializer_class = self.get_model(recurso)
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class StorageDetailView(APIView):
    def get_model(self, recurso):
        item = RESOURCE_MAP.get(recurso)
        if not item:
            raise NotFound("Recurso no encontrado")
        return item

    def delete(self, request, recurso, record_id):
        model, _ = self.get_model(recurso)
        try:
            obj = model.objects.get(pk=record_id)
        except model.DoesNotExist:
            raise NotFound("Registro no encontrado")
        obj.delete()
        return Response({"deleted": record_id})
