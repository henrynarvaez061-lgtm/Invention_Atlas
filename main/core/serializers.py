# Serializadores DRF: validan y dan forma a los datos expuestos por la API.
# Nota IA: parte de este código fue generado con ayuda de IA (OpenCode/Claude).
from rest_framework import serializers
from .models import User, Building, Activo, ActivoUniversidad, OrdenActivo, HistorialActivo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "phone"]

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ["id", "name", "incharge"]

class ActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activo
        fields = "__all__"

class ActivoUniversidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivoUniversidad
        fields = ["id", "codigo", "nombre", "categoria", "ubicacion", "responsable", "estado", "marca", "modelo", "adquisicion", "proximaRevision", "valor", "vidaUtil", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

class OrdenActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenActivo
        fields = "__all__"
        read_only_fields = ["created_at"]

class HistorialActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialActivo
        fields = "__all__"
        read_only_fields = ["created_at"]
