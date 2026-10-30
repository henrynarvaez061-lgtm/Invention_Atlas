# Atlas MN · Sistema de gestión de activos y órdenes de mantenimiento

**Video Demo: <URL>**

## Description:

Atlas MN es una aplicación web para la gestión de activos institucionales
(equipos de cómputo, mobiliario, redes, infraestructura) junto con las órdenes
de trabajo y el historial de mantenimiento asociados a cada activo. El proyecto
surge de un problema real: en muchas organizaciones el inventario todavía se
lleva en hojas de cálculo o en listas impresas. Con ese sistema es difícil
responder preguntas simples: ¿qué equipos existen?, ¿dónde están?, ¿quién es el
responsable?, ¿está operativo o descompuesto?, ¿qué mantenimiento recibió y
cuánto costó? Atlas MN resuelve esto desde una sola interfaz web donde se
registran los activos con su código, categoría, ubicación, responsable, estado,
marca, modelo, fecha de adquisición, próxima revisión, valor y vida útil; se
crean órdenes de trabajo con prioridad, fecha y vencimiento; y cada intervención
queda documentada en un historial con tipo, detalle, técnico, costo, repuesto
utilizado, cantidad, documento y foto.

La funcionalidad es un CRUD completo con visión de sistema: la interfaz permite
crear, consultar, filtrar, buscar y eliminar activos, órdenes e historiales, y
además muestra resúmenes en un panel inicial (equipos en operación, en
mantenimiento y fuera de servicio, próximas revisiones y el valor total del
inventario calculado en tiempo real). El proyecto aplica lo aprendido a lo largo
de CS50: programación en Python, SQL mediante un motor de base de datos real,
y desarrollo web con HTML, CSS y JavaScript, combinado con los conceptos de la
semana de Django del curso.

### Arquitectura general

El backend está construido con **Python + Django + Django REST Framework
(DRF)** y el frontend es una **aplicación de una sola página (SPA) en
HTML/CSS/JavaScript puro**, sobre una base de datos **SQLite**. Elegí Django
porque es el framework que se enseña en CS50 y porque incluye un panel de
administración listo para usar, lo que permite corregir o revisar datos sin
escribir interfaces adicionales. DRF aporta los serializadores, que validan
automáticamente los datos que llegan por la API, y vistas con manejo de errores
consistente. SQLite se eligió porque no requiere instalar ni configurar un
servidor de base de datos: con `migrate` se crea el archivo y cualquier persona
que reciba el proyecto puede ejecutarlo de inmediato, lo cual conviene a un
proyecto de CS50 que va a ser evaluado por otra persona desde cero.

En el frontend evité frameworks (React, Vue, etc.) y herramientas de build
(`npm`, bundlers, `node_modules`): toda la interfaz vive en un único archivo
HTML. Eso mantiene el peso del proyecto mínimo, elimina pasos de compilación y
garantiza que quien pruebe el proyecto solo necesite tener Python instalado.

### Estructura del proyecto: qué contiene cada archivo

- `main/manage.py`: utilidad estándar de Django para migraciones, servidor de
  desarrollo y ejecución de las pruebas.
- `main/main/settings.py`: configuración del proyecto: aplicaciones
  instaladas, base de datos SQLite, validadores de contraseñas y archivos
  estáticos. La `SECRET_KEY` se lee primero de la variable de entorno
  `DJANGO_SECRET_KEY`; si no existe, se usa un valor de desarrollo por defecto
  para que `runserver` funcione sin configuración adicional.
- `main/main/urls.py`: rutas del proyecto: `/` sirve la interfaz web,
  `/admin/` el administrador de Django, `/api/health/` un chequeo de salud del
  backend, `/api/` el router de DRF (usuarios) y `/api/storages/<recurso>` con
  su variante `/<id>` la API que consume la interfaz.
- `main/core/models.py`: los seis modelos del proyecto. `User` y `Building`
  modelan personas responsables y sedes (del proyecto MN original); `Activo`
  es la entidad original que se conserva por compatibilidad con las migraciones
  anteriores; y las tres entidades centrales de Atlas son
  `ActivoUniversidad` (el inventario), `OrdenActivo` (las órdenes de trabajo) e
  `HistorialActivo` (la bitácora de mantenimientos con costo y repuesto). En las
  tres centrales el identificador es una clave primaria de texto (por ejemplo
  `ACT-2026-001`, `OT-9001`, `H-8001`), de modo que el código que el usuario ve
  en pantalla coincida con el que vive en la base de datos y se pueda citar de
  forma legible en un correo o un informe impreso.
- `main/core/serializers.py`: serializadores DRF que definen qué campos se
  exponen y validan en la API para cada modelo.
- `main/core/views.py`: la vista de la página principal, el chequeo de salud y
  dos vistas genéricas compartidas por los tres recursos: `StorageListCreateView`
  (GET lista + POST crea) y `StorageDetailView` (DELETE elimina). En lugar de
  escribir tres vistas casi iguales, un diccionario `RESOURCE_MAP` traduce el
  nombre del recurso de la URL a su modelo y su serializador; eso evita
  código duplicado y hace trivial agregar otro recurso en el futuro.
- `main/core/url.py`: router de DRF que expone el recurso `users` bajo `/api/`.
- `main/core/admin.py`: registro de todos los modelos en el administrador de
  Django para poder revisar o corregir datos manualmente.
- `main/core/migrations/`: migraciones del esquema, generadas con
  `makemigrations` (creación de los seis modelos e integración de Atlas).
- `main/core/templates/core/index.html`: punto de entrada de la SPA: cabecera
  (`<head>`), el script inline anti-parpadeo de tema, los enlaces a las hojas de
  estilo y los módulos de JavaScript, y la estructura general que incrusta por
  `{% include %}` cada vista y ventana modal.
- `main/core/templates/core/partials/`: fragmentos de la interfaz incrustados
  con `{% include %}`: `rail.html` (barra lateral de navegación), `topbar.html`
  (cabecera con acciones), `section-dashboard.html` (panel de resumen),
  `section-assets.html` (inventario), `section-orders.html` (órdenes),
  `section-history.html` (historial), `drawer.html` (panel de detalle del
  activo) y `modal-asset.html` / `modal-order.html` / `modal-history.html`
  (formularios de registro).
- `main/core/static/core/css/`: hojas de estilo de la interfaz, divididas por
  responsabilidad y cargadas en el mismo orden en que se aplicaban cuando el
  CSS vivía inline: `base.css` (tokens de diseño y base), `layout.css` (barra
  lateral y contenido), `components.css` (KPIs, paneles y estados),
  `tables-forms.css` (tablas y formularios), `health.css` (salud operativa y
  estados vacíos), `overlays.css` (modales y panel de detalle), `toast.css`
  (notificaciones) y `responsive.css` (adaptación a pantallas pequeñas).
- `main/core/static/core/js/`: lógica de la SPA en módulos con alcance global
  (scripts clásicos, necesarios porque la interfaz usa `onclick` en el HTML):
  `data.js` (estado y llamadas `fetch` al API), `dashboard.js` (resumen y
  animaciones), `tables.js` (tablas y filtrado), `forms.js` (guardado de
  activos, órdenes e historial), `navigation.js` (secciones y títulos),
  `overlays.js` (modales, panel de detalle y notificaciones), `theme.js`
  (tema claro/oscuro) e `init.js` (gestos táctiles y arranque de la app).
- `main/db.sqlite3`: base de datos SQLite incluida con datos de demostración,
  para que el evaluador vea la aplicación con contenido desde el primer
  arranque sin tener que crear nada.
- `requirements.txt` y `pyproject.toml`: las dependencias del proyecto
  (Django y djangorestframework).

### Decisiones de diseño

Diseñé la API con un único patrón de rutas (`/api/storages/<recurso>`) en vez de
rutas separadas por entidad porque la interfaz trata a los tres recursos de
forma muy parecida; así el JavaScript puede usar funciones genéricas
(`apiList(recurso)`, `apiCreate(recurso, datos)`) y no hay que duplicar
lógicas por cada nueva entidad. Las listas se devuelven envueltas como
`{"items": [...], "total": n}` para que la interfaz pueda actualizar sus
contadores directamente sin recorrer la lista en busca del tamaño.

En cuanto a errores, preferí respuestas de API predecibles antes que páginas
de error: si el cuerpo del POST no valida, DRF responde `400` con el detalle
por campo; si el recurso o el registro no existe, la vista responde `404`; el
recurso desconocido en la URL también responde `404` mediante `NotFound`
de DRF. En el frontend, todas las llamadas `fetch` están envueltas en
`try/catch` y comunican el fallo en la propia interfaz.

Para el estilo preferí CSS puro con variables de tema en lugar de un framework
de componentes: la interfaz es única y a medida, y así todo el sistema visual
vive en un solo archivo legible de principio a fin. El tema se aplica antes del
primer pintado mediante un script inline que lee `localStorage`, lo que evita
el parpadeo al cargar con el tema claro. Los iconos usan la biblioteca Lucide
vía CDN por su peso mínimo y su look acorde al diseño.

### Sobre el uso de inteligencia artificial

Parte de este código fue generado con ayuda de IA (OpenCode/Claude) como
asistente de redacción y refactorización, principalmente en la estructura base
de Django, los serializadores, las migraciones y dentro de bloques de estilo y
JavaScript de la interfaz. Las decisiones de diseño, el modelo de datos, la
organización de la interfaz, las pruebas, el README y la revisión final son
mías, tal como exigen las normas del curso.

### Cómo ejecutar el proyecto

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cd main
python manage.py migrate        # opcional: la base de datos ya viene incluida
python manage.py runserver
```

Abrir `http://127.0.0.1:8000/` para usar la aplicación, `/admin/` para el
administrador de Django (necesita crear un superusuario con
`python manage.py createsuperuser`) y `/api/health/` para verificar el backend.
Las pruebas se ejecutan con `python manage.py test` dentro de `main/`.

### Endpoints disponibles

| Método   | Ruta                                    | Descripción                   |
|----------|-----------------------------------------|-------------------------------|
| GET      | `/api/health/`                          | Chequeo de salud del backend  |
| GET/POST | `/api/storages/activos_universidad`     | Listar / crear activos        |
| GET/POST | `/api/storages/ordenes_activos`         | Listar / crear órdenes        |
| GET/POST | `/api/storages/historial_activos`       | Listar / crear historiales    |
| DELETE   | `/api/storages/<recurso>/<id>`          | Eliminar un registro          |
| GET/POST | `/api/users/`                           | CRUD de usuarios (DRF router) |
