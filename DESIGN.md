---
name: Atlas · Gestión de Activos Universitarios
description: Placa de identificación — un sistema de inventario operativo con la densidad y la autoridad de la señalización industrial.
colors:
  accent: "#ff6a2b"
  accent-2: "#ff8a55"
  accent-light: "#c2410c"
  accent-2-light: "#e0521a"
  accent-ink: "#160a03"
  accent-ink-light: "#ffffff"
  ground: "#0e1114"
  surface: "#171b1f"
  surface-2: "#1e2429"
  surface-3: "#272f35"
  surface-light: "#f4f6f7"
  surface-2-light: "#ffffff"
  surface-3-light: "#e9edef"
  line: "#2b333a"
  line-strong: "#3b464e"
  line-light: "#d2d8dc"
  ink: "#edf2f5"
  ink-2: "#aab6be"
  ink-3: "#86939c"
  ink-light: "#14181b"
  ink-2-light: "#515d67"
  ink-3-light: "#626e79"
  ok: "#57c78f"
  warn: "#e7b34c"
  danger: "#f4766f"
  neutral: "#93a5b1"
typography:
  display:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  metric:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
  code:
    fontFamily: "Archivo Narrow, Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.03em"
rounded:
  none: "0"
  sm: "2px"
  md: "3px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "22px"
  xl: "32px"
components:
  button:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 15px"
    height: "44px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 15px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-2}"
  button-primary-light:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.accent-ink-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "10px 15px"
    height: "44px"
  input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
    height: "44px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "20px 22px 22px"
  kpi-cell:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "18px 20px"
  chip-ok:
    backgroundColor: "rgba(87, 199, 143, 0.16)"
    textColor: "{colors.ok}"
    rounded: "{rounded.sm}"
    padding: "5px 10px 5px 12px"
  chip-warn:
    backgroundColor: "rgba(231, 179, 76, 0.16)"
    textColor: "{colors.warn}"
    rounded: "{rounded.sm}"
    padding: "5px 10px 5px 12px"
  chip-danger:
    backgroundColor: "rgba(239, 99, 96, 0.16)"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: "5px 10px 5px 12px"
---

# Design System: Atlas · Gestión de Activos Universitarios

## Overview

**Creative North Star: "Placa de Identificación" (Asset Plate)**

Atlas se ve como el panel de control de una instalación industrial real: superficies de acero, tipografía estarcida, colores de señalización y una rejilla densa que no esconde nada. No es una aplicación "amable" ni una hoja de cálculo disfrazada; es una herramienta de operación que un equipo de mantenimiento usa a diario durante horas. El sistema respira la lógica de la placa metálica atornillada a una máquina: cada activo tiene un código grabado, cada estado tiene una pestaña estampada con su color, y la información crítica se lee en una fracción de segundo.

La densidad es deliberada y generosa a la vez. Las tablas muestran muchas filas sin volverse ruidosas porque el color se reserva para el estado, nunca para decorar. El acento único —naranja de seguridad— aparece en pocos lugares a propósito: el marcador de navegación activa, el código del activo, el botón primario, el foco. Su escasez es lo que le da autoridad. Todo lo demás es una escala de grises neutra con una temperatura ligeramente azul-acero.

El movimiento es funcional, nunca decorativo: las pestañas de estado se "estampan" al entrar, el panel de detalle se desliza desde el borde derecho con una curva propia, los números se animan al cambiar. La interfaz es bilingüe en estructura pero monolingüe en idioma: español, siempre, con cifras tabulares y formatos locales.

**Key Characteristics:**
- Superficies planas apiladas por token tonal; la elevación se reserva a los overlays reales.
- Un solo acento (naranja de seguridad) con regla de escasez estricta.
- Tipografía estarcida condensada para títulos y cifras; Archivo para cuerpo.
- Esquinas decididas y pequeñas (2–3px): precisión de placa troquelada, no blandura.
- Bordes de 1px (`--line`) como estructura; la separación se dibuja, no se sombrea.
- Modo oscuro por defecto (sala de operaciones); modo claro = aluminio cepillado.
- Gestos: deslizar para cerrar el panel y el aviso; entrada estampada de estados.

## Colors

Una base neutra de acero azulado con un único acento naranja de seguridad; los estados (verde, ámbar, rojo) son señales, no decoración.

### Primary
- **Naranja de Seguridad** (#ff6a2b oscuro / #c2410c claro): el único acento del sistema. Se usa en el marcador de la navegación activa, el código de activo en las tablas, el botón primario, el borde de foco y el aviso flotante. En modo claro baja a un óxido profundo (#c2410c) para mantener contraste AA sobre aluminio claro. Su fuerza depende de no repetirse.
- **Naranja de Seguridad — elevado** (#ff8a55): estado hover del botón primario en oscuro.
- **Tinta sobre acento** (#160a03 oscuro / #ffffff claro): texto sobre relleno naranja.

### Neutral
- **Ground** (#0e1114 oscuro / #e6e9ec claro): fondo de la aplicación y de los campos de formulario (los inputs se "hunden" en el fondo).
- **Surface** (#171b1f / #f4f6f7): paneles, tira KPI y el riel lateral.
- **Surface 2** (#1e2429 / #ffffff): botones en reposo, campos de la placa, aviso flotante.
- **Surface 3** (#272f35 / #e9edef): hover de botones, navegación activa, subidas de tono.
- **Línea** (#2b333a / #d2d8dc): el borde estructural de 1px en toda la interfaz (divisiones de tabla, rejilla KPI, contornos de campo). **Línea fuerte** (#3b464e): hover de campos.
- **Tinta** (#edf2f5 / #14181b): texto principal. **Tinta 2** (#aab6be / #515d67): texto secundario y etiquetas. **Tinta 3** (#86939c / #626e79): metadatos, placeholders y texto atenuado — el paso más débil que aún cumple AA (4.5:1).

### Secondary
- **Verde Operativo** (#57c78f / #197049): estado "Operativo"/éxito, acentos del aviso correcto.
- **Ámbar de Aviso** (#e7b34c / #7d5900): estado "En mantenimiento", umbrales de atención, subtítulo KPI en alerta.
- **Rojo de Incidencia** (#f4766f / #b02f36): estado "Fuera de servicio", valores KPI críticos, aviso de error.
- **Gris Neutro** (#93a5b1 / #56626c): estado por defecto ("Dado de baja"/neutral).

### Named Rules
**La Regla del Acento Único.** El naranja cubre ≤10% de cualquier pantalla. Aparece solo como marcador, enlace, foco o botón primario; nunca como relleno de superficie, fondo de fila o cabecera.

**La Regla de la Señal, No del Adorno.** El verde, el ámbar y el rojo son exclusivamente estados. Un color de estado nunca se usa para decorar una sección ni para jerarquía tipográfica.

## Typography

**Display Font:** Archivo Narrow (con Archivo, system-ui)
**Body Font:** Archivo (con system-ui, -apple-system, Segoe UI, Roboto)

**Character:** Una pareja de una sola familia en dos anchos: la condensada estarcida da a títulos, cifras y códigos la autoridad de una placa troquelada; la Archivo normal mantiene el cuerpo legible en sesiones largas. Las cifras tabulares hacen que las columnas de valores se alineen como un panel de instrumentos.

### Hierarchy
- **Display** (700, 32px, 1.2): títulos de página (`h1`). Se usa una sola vez por vista.
- **Metric** (700, 36px, 1.05, Archivo Narrow): cifras de la tira KPI. El número más grande de la pantalla.
- **Title** (700, 20–22px, 1.2, Archivo Narrow): encabezados de panel y de diálogo.
- **Body** (400, 16px, 1.55, Archivo): texto general; el subtítulo de página se limita a 62ch.
- **Body-Small** (400, 13px, 1.45): metadatos de activo, notas del riel, pies de placa.
- **Label** (600, 13.5px, 0.01em): etiquetas KPI, etiquetas de campo, tablas.
- **Code/Plate** (600, 13px, 0.03em, Archivo Narrow): códigos de activo (ej. `ACT-2026-001`), el único lugar donde el naranja aparece como texto a color.

### Named Rules
**La Regla de la Cifra Tabular.** Toda cifra viene en Archivo Narrow con `font-variant-numeric: tabular-nums`; los números que cambian (KPIs, contadores) nunca deben "bailar" de ancho.

**La Regla de la Placa.** Los códigos de activo son la única cadena de texto que siempre va en el ancho condensado y a color de acento. No se estilizan así nombres, ubicaciones ni responsables.

## Layout

Un riel lateral fijo de 250px (`--rail-w`) a la izquierda y un área de contenido fluida a la derecha con `max-width: 1560px` y padding `26px 32px 56px`. La tira de indicadores es una rejilla de 4 columnas iguales; debajo, el contenido se divide en una rejilla principal de 2 columnas (`minmax(0, 1.7fr)` para tablas, `minmax(300px, 0.8fr)` para los paneles de salud y alertas).

La densidad es media-alta: las filas de tabla usan relleno compacto y bordes inferiores de 1px. El ritmo vertical se construye con múltiplos de ~10px (gap de rejilla de paneles 18px, separación de campos 14px, padding de panel 20–22px).

Responsive, de mayor a menor:
- **≤1120px:** el contenido colapsa a una columna; la tira KPI pasa a 2×2.
- **≤860px:** el riel se convierte en una barra inferior fija (72px de alto) con iconos y etiquetas cortas; el contenido ocupa todo el ancho; las tablas se transforman en "placas" apiladas (cada fila se lee como una ficha vertical).
- **≤420px:** la tira KPI pasa a 1 columna, los botones se reparten el ancho disponible.
- `prefers-reduced-motion: reduce` desactiva animaciones de entrada y transiciones no esenciales.

### Named Rules
**La Regla de la Barra Inferior.** En móvil, la navegación vive en el borde inferior de la pantalla, nunca en un menú hamburguesa. Las cuatro secciones son destinos de un toque, siempre visibles.

**La Regla de la Placa Apilada.** Por debajo de 860px no hay scroll horizontal: cada fila de tabla se recompone como una ficha con su código, nombre, estado y acciones vertidos verticalmente.

## Elevation & Depth

Atlas es **plano por defecto**. La profundidad se comunica con tres mecanismos, en orden de frecuencia: (1) **capas tonales** — superficies de distinta luminosidad apiladas (`--ground` → `--surface` → `--surface-2` → `--surface-3`); (2) **bordes de 1px** que dibujan la estructura; y (3) **sombras, solo para overlays reales** — diálogos, el panel lateral de detalle y el aviso flotante, que literalmente flotan sobre el resto de la página. Ninguna superficie en línea lleva sombra.

La tira KPI y la rejilla de la placa logran sus divisiones internas con una rejilla de `gap: 1px` sobre el color `--line`, mostrando el fondo a través de las ranuras. Es una línea, no una sombra.

### Shadow Vocabulary
- **Float / Overlay** (`0 24px 60px -24px rgba(0,0,0,0.85)` oscuro; `0 24px 50px -26px rgba(20,26,30,0.4)` claro): elevación de diálogo, panel lateral y aviso flotante. Es la única sombra del sistema y señala EXCLUSIVAMENTE "esto está por encima de la página".
- **Focus Ring** (`0 0 0 2px var(--ground), 0 0 0 4px var(--accent)`): anillo de foco accesible; no es profundidad, es foco.

### Named Rules
**La Regla de lo Plano en Reposo.** Las superficies en el flujo del documento son planas. Si un elemento necesita una sombra, o es un overlay, o es un error de composición.

**La Regla de la Línea Primero.** Cuando hace falta separar, se usa un borde de 1px (`--line`). La sombra es el último recurso, nunca el primero.

## Shapes

El lenguaje de forma es **troquelado y preciso**: radios pequeños y decididos que evocan una placa metálica cortada a medida, no una tarjeta blanda. El radio base es de 2px (`--radius`) y las superficies grandes (paneles, diálogo, tira KPI) usan 3px (`--radius-lg`). No hay píldoras ni formas de radio completo en ningún elemento estructural.

El vocabulario de forma incluye dos siluetas recurrentes:
- **El marcador de placa:** una barra vertical de 3px pegada al borde izquierdo (navegación activa, pestaña de estado, aviso flotante). Es la firma más reconocible del sistema.
- **La pestaña estampada:** el chip de estado lleva un borde izquierdo de 3px del color de su propio estado (`currentColor`), como una chapa remachada.

Los iconos son de trazo, 17–19px, monocromos, y heredan el color del texto que acompañan.

## Components

### Buttons
- **Shape:** esquina de placa (2px). Altura mínima 44px; relleno 10×15px; icono de 17px con 8px de separación.
- **Primary:** relleno naranja de acento con tinta oscura (o blanca en claro); 600 de peso; hover a `--accent-2`.
- **Secondary (default):** superficie 2 con tinta 1; hover a superficie 3.
- **Ghost:** fondo transparente y tinta 2; hover a superficie 2. Se usa para acciones secundarias ("Exportar", "Cancelar").
- **Icon button:** 44×44px cuadrado, sin relleno, para cerrar diálogos y el panel.
- **Hover / Focus:** transiciones de color a `--t-fast` (140ms) `ease`; `:active` escala a 0.97 (feedback táctil); foco con anillo de acento. En móvil, el `:active` es el feedback principal porque no hay hover.

### Chips (pestaña de estado)
- **Style:** relleno translúcido del color de estado al 12–16% (`--ok-soft`, etc.), texto en el color pleno del estado, borde izquierdo de 3px en `currentColor`, radio 2px.
- **State:** `ok` (Operativo), `warn` (En mantenimiento), `danger` (Fuera de servicio), neutral (Dado de baja). Entran con la animación `stamp` (260ms, escala 1.08→1).

### Cards / Containers (paneles)
- **Corner Style:** 3px.
- **Background:** `--surface`.
- **Shadow Strategy:** ninguna en reposo (ver Elevation & Depth).
- **Border:** sin borde propio; la separación se logra por color de superficie sobre el fondo.
- **Internal Padding:** 20px arriba/lados, 22px abajo; encabezado con 16px de margen inferior.

### Inputs / Fields
- **Style:** fondo `--ground` (hundido respecto al panel), borde de 1px `--line`, radio 2px, altura mínima 44px.
- **Focus:** el borde cambia a color de acento (sin glow ni sombra).
- **Hover:** el borde sube a `--line-strong`.
- **Placeholder:** tinta 3. Etiquetas de formulario encima del campo, en tinta 2 a 13.5px/500.

### Navigation
- **Style:** lista vertical en el riel de 250px; cada destino tiene icono de 19px, etiqueta de 15px y un marcador de placa de 3px que se estampa al activarse.
- **Default / Hover / Active:** reposo en tinta 2 sobre superficie 1; hover a superficie 2 y tinta 1; activo con superficie 3, peso 600 y el marcador de acento visible (`scaleY(1)`).
- **Mobile (≤860px):** barra inferior fija de 72px, cuatro destinos con icono + etiqueta corta; se retiran el riel, el bloque de marca y la nota.

### Signature: Drawer "Placa de Activo"
El panel de detalle se desliza desde el borde derecho (460px máx.) con la curva `--ease-drawer` (340ms), sobre un fondo oscurecido que responde al toque. La cabecera muestra el código de activo como placa; el cuerpo es una rejilla de campos etiqueta/valor (`plate-grid`) dividida por líneas, seguida de secciones de solo lectura (órdenes e historial del activo). Se cierra con Esc, con el backdrop, con el botón, o **deslizando hacia la derecha** (gesto de umbral 90px o velocidad >0.5, solo en punteros táctiles/lápiz).

### Signature: Tira KPI
Cuatro celdas que forman una sola pieza continua: van unidas por una rejilla de `gap: 1px` sobre el color de línea, de modo que las divisiones son ranuras, no bordes. Cada celda lleva una regla inferior de 2px que se colorea según su estado (ámbar para atención, rojo para crítico) y una cifra Condensed animada al cambiar.

### Signature: Aviso Flotante (toast)
Banda flotante en la esquina inferior derecha con marcador de placa a la izquierda: verde para éxito, rojo para error. Entra con deslizamiento + fundido y admite deslizamiento para descartar. Es el único overlay que no bloquea la interacción.

## Do's and Don'ts

### Do:
- **Do** reservar el naranja de acento para ≤10% de la pantalla: marcador, código de activo, botón primario, foco (La Regla del Acento Único).
- **Do** separar con bordes de 1px (`--line`) o con la rejilla de `gap: 1px`; usa `box-shadow` únicamente en diálogo, panel lateral y aviso flotante.
- **Do** usar Archivo Narrow (700) para títulos, cifras KPI y códigos de activo; Archivo (400–600) para todo el texto corrido y las etiquetas.
- **Do** mantener todos los controles interactivos con altura mínima de 44px, incluidos los icon buttons.
- **Do** tratar el verde, el ámbar y el rojo como estados, siempre acompañados de texto (nunca solo color).
- **Do** respetar `prefers-reduced-motion`: sin animaciones de entrada ni transiciones no esenciales.
- **Do** mantener los radios en 2px (controles) y 3px (superficies grandes); nada de píldoras.

### Don't:
- **Don't** añadir un segundo color de acento ni usar el naranja como relleno de superficie, fondo de fila o cabecera.
- **Don't** usar sombras en superficies dentro del flujo (paneles, tira KPI, botones, filas). Ver La Regla de lo Plano en Reposo.
- **Don't** sustituir la barra inferior móvil por un menú hamburguesa; las cuatro secciones deben ser siempre accesibles.
- **Don't** introducir scroll horizontal en móvil; las tablas se recomponen como placas apiladas por debajo de 860px.
- **Don't** usar tipografía condensada en nombres, ubicaciones o responsables; es exclusiva de títulos, cifras y códigos (La Regla de la Placa).
- **Don't** usar colores de estado para decorar o para jerarquía visual (La Regla de la Señal, No del Adorno).
- **Don't** bajar el texto por debajo de tinta 3 (`#86939c` oscuro / `#626e79` claro) para contenido legible; ese es el suelo de contraste AA.
