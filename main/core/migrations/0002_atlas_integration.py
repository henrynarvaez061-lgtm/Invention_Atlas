
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name="building",
            name="incharge",
            field=models.ManyToManyField(
                blank=True,
                related_name="buildings",
                to="core.user",
            ),
        ),
        migrations.AlterField(
            model_name="activo",
            name="purhase_day",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="activo",
            name="guarantee",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="activo",
            name="alive_expectation",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name="ActivoUniversidad",
            fields=[
                ("id", models.CharField(
                    max_length=100,
                    primary_key=True,
                    serialize=False,
                )),
                ("codigo", models.CharField(max_length=100, unique=True)),
                ("nombre", models.CharField(max_length=200)),
                ("categoria", models.CharField(max_length=100)),
                ("ubicacion", models.CharField(max_length=200)),
                ("responsable", models.CharField(max_length=200)),
                ("estado", models.CharField(max_length=50, db_index=True)),
                ("marca", models.CharField(max_length=100, blank=True, default="")),
                ("modelo", models.CharField(max_length=100, blank=True, default="")),
                ("adquisicion", models.CharField(max_length=40, blank=True, default="")),
                ("proximaRevision", models.CharField(max_length=40, blank=True, default="")),
                ("valor", models.DecimalField(max_digits=12, decimal_places=2, default=0)),
                ("vidaUtil", models.DecimalField(max_digits=10, decimal_places=2, default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="OrdenActivo",
            fields=[
                ("id", models.CharField(
                    max_length=100,
                    primary_key=True,
                    serialize=False,
                )),
                ("activoId", models.CharField(max_length=100, db_index=True)),
                ("titulo", models.CharField(max_length=200)),
                ("responsable", models.CharField(max_length=200)),
                ("prioridad", models.CharField(max_length=40)),
                ("estado", models.CharField(max_length=50, db_index=True)),
                ("fecha", models.CharField(max_length=40)),
                ("vencimiento", models.CharField(max_length=40)),
                ("cierre", models.CharField(max_length=40, blank=True, default="")),
                ("resultado", models.TextField(blank=True, default="")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="HistorialActivo",
            fields=[
                ("id", models.CharField(
                    max_length=100,
                    primary_key=True,
                    serialize=False,
                )),
                ("activoId", models.CharField(max_length=100, db_index=True)),
                ("fecha", models.CharField(max_length=40)),
                ("tipo", models.CharField(max_length=100)),
                ("detalle", models.TextField()),
                ("tecnico", models.CharField(max_length=200)),
                ("prioridad", models.CharField(max_length=40)),
                ("costo", models.DecimalField(max_digits=12, decimal_places=2, default=0)),
                ("repuesto", models.CharField(max_length=200, blank=True, default="")),
                ("cantidad", models.DecimalField(
                    max_digits=10,
                    decimal_places=2,
                    blank=True,
                    null=True,
                )),
                ("documento", models.CharField(max_length=500, blank=True, default="")),
                ("foto", models.CharField(max_length=500, blank=True, default="")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]