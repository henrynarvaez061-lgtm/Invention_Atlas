<<<<<<< HEAD
# Proyecto MN V1.1 — Atlas integrado con interfaz HTML

Esta versión mantiene Django y Django REST Framework como backend del proyecto MN e incluye explícitamente el frontend HTML/CSS original de Atlas.

## Dónde está el HTML

- `frontend/index.html`: archivo HTML original de Atlas, incluido como fuente independiente para que pueda abrirse/revisarse y editarse.
- `frontend/styles.css`: hoja CSS auxiliar original de Atlas.
- `main/core/templates/core/index.html`: plantilla completa que Django sirve en la ruta `/`. Incluye la interfaz Atlas (HTML, estilos y JavaScript) adaptada visualmente a la marca `MN · ATLAS`.
- `main/core/static/core/styles.css`: estilos estáticos que ya estaban en el proyecto Django.

La interfaz que se ve al ejecutar Django es la plantilla `main/core/templates/core/index.html`; el directorio `frontend/` es una copia fuente adicional, no necesita ejecutarse como servidor aparte.

## Requisitos

Python compatible con las versiones indicadas en `pyproject.toml` y las dependencias de `requirements.txt`.

## Ejecutar en Kali Linux / Linux

Desde la raíz descomprimida del proyecto:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cd main
python manage.py migrate
python manage.py runserver
```

Abre `http://127.0.0.1:8000/`. Para la administración de Django, usa `http://127.0.0.1:8000/admin/`.

## API usada por la interfaz

- `GET /api/health/`
- `GET /api/storages/activos_universidad`
- `POST /api/storages/activos_universidad`
- `GET /api/storages/ordenes_activos`
- `POST /api/storages/ordenes_activos`
- `GET /api/storages/historial_activos`
- `POST /api/storages/historial_activos`
- `DELETE /api/storages/<recurso>/<id>`

## Nota sobre los archivos de base de datos

Se conservan los modelos y migraciones del proyecto MN y se agregan los modelos para activos universitarios, órdenes e historial de Atlas. Si se desea empezar con una base de datos limpia, haz una copia de seguridad antes de retirar `main/db.sqlite3`; normalmente basta con ejecutar `python manage.py migrate`.
=======
# Invention_Atlas
>>>>>>> f537647bbd87c3d1f4d211279ffc0a1fc8ebc601
