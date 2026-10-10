from django.db import models


class User(models.Model):
    """Usuario de contacto/responsable del sistema MN."""
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name


class Building(models.Model):
    name = models.CharField(max_length=200)
    incharge = models.ManyToManyField(User, blank=True, related_name="buildings")

    def __str__(self):
        return self.name


class Activo(models.Model):
    """Entidad original de MN; se conserva para compatibilidad."""
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    purhase_day = models.DateTimeField(null=True, blank=True)
    guarantee = models.DateTimeField(null=True, blank=True)
    alive_expectation = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.brand})"


class ActivoUniversidad(models.Model):
    """Inventario Atlas integrado en el proyecto MN."""
    id = models.CharField(max_length=100, primary_key=True)
    codigo = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=200)
    categoria = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=200)
    responsable = models.CharField(max_length=200)
    estado = models.CharField(max_length=50, db_index=True)
    marca = models.CharField(max_length=100, blank=True, default="")
    modelo = models.CharField(max_length=100, blank=True, default="")
    adquisicion = models.CharField(max_length=40, blank=True, default="")
    proximaRevision = models.CharField(max_length=40, blank=True, default="")
    valor = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    vidaUtil = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"


class OrdenActivo(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    activoId = models.CharField(max_length=100, db_index=True)
    titulo = models.CharField(max_length=200)
    responsable = models.CharField(max_length=200)
    prioridad = models.CharField(max_length=40)
    estado = models.CharField(max_length=50, db_index=True)
    fecha = models.CharField(max_length=40)
    vencimiento = models.CharField(max_length=40)
    cierre = models.CharField(max_length=40, blank=True, default="")
    resultado = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.titulo


class HistorialActivo(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    activoId = models.CharField(max_length=100, db_index=True)
    fecha = models.CharField(max_length=40)
    tipo = models.CharField(max_length=100)
    detalle = models.TextField()
    tecnico = models.CharField(max_length=200)
    prioridad = models.CharField(max_length=40)
    costo = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    repuesto = models.CharField(max_length=200, blank=True, default="")
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    documento = models.CharField(max_length=500, blank=True, default="")
    foto = models.CharField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.tipo}: {self.activoId}"
