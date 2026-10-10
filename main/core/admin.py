from django.contrib import admin
from .models import User, Building, Activo, ActivoUniversidad, OrdenActivo, HistorialActivo

admin.site.register([User, Building, Activo, ActivoUniversidad, OrdenActivo, HistorialActivo])
