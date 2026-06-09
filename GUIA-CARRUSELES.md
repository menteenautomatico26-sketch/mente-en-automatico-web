# Guía: Cómo crear carruseles de Instagram para @menteenautomatico

## Archivos del sistema

| Archivo | Para qué sirve |
|---|---|
| `gen-slides.js` | Genera las imágenes PNG automáticamente |
| `guia-publicacion-60-posts.txt` | Captions y hashtags listos para publicar |
| `ig/post-01/` … `ig/post-60/` | Las 300 imágenes PNG generadas |
| `carruseles-60-posts.zip` | ZIP para descargar todo de una vez |

---

## ¿Cómo agregar un carrusel nuevo?

### Paso 1 — Abre `gen-slides.js` y busca el array `POSTS`

Alrededor de la línea 80 verás esto:

```js
const POSTS = [
  {
    post: 1, categoria: 'HERRAMIENTA IA · POST 1',
    titulo: 'La herramienta que más\nusa el mundo en silencio.',
    sub: 'Claude AI: más potente de lo que crees. Swipe →',
    slides: [ ... ]
  },
  ...
```

### Paso 2 — Copia el bloque de un post existente y edítalo

```js
{
  post: 61,                              // número del post (siguiente disponible)
  categoria: 'HERRAMIENTA IA · POST 61', // etiqueta que aparece arriba a la derecha
  titulo: 'Tu título principal\nen dos líneas.',  // usa \n para saltar línea
  sub: 'Subtítulo corto. Swipe →',       // texto debajo del título en portada

  slides: [
    { tipo: 'cover' },   // SIEMPRE el primero — portada automática

    // OPCIÓN A: Lista de puntos
    { tipo: 'lista',
      tit: 'Título de este slide',
      items: ['Punto 1', 'Punto 2', 'Punto 3', 'Punto 4'] },

    // OPCIÓN B: Pasos numerados
    { tipo: 'pasos',
      tit: 'Cómo hacerlo',
      pasos: ['Paso 1: ...', 'Paso 2: ...', 'Paso 3: ...'] },

    // OPCIÓN C: Tips con borde izquierdo
    { tipo: 'tips',
      tit: 'Lo que debes saber',
      tips: ['Tip 1 explicado', 'Tip 2 explicado', 'Tip 3 explicado'] },

    // OPCIÓN D: Tabla comparativa
    { tipo: 'comparacion',
      tit: 'Comparación',
      filas: [
        ['Criterio',  'Opción A',  'Opción B'],
        ['Precio',    'Gratis',    '$10/mes'],
        ['Facilidad', 'Alta',      'Media'],
      ]},

    { tipo: 'cta' },  // SIEMPRE el último — pantalla de seguir / compartir
  ],
},
```

### Paso 3 — Corre el generador

```bash
# En la terminal, dentro de la carpeta del proyecto:
node gen-slides.js 61 61      # solo el post 61
node gen-slides.js 61 65      # posts 61 al 65
node gen-slides.js            # regenera los 60 originales
```

Los PNG se guardan automáticamente en `ig/post-61/slide-01.png`, etc.

---

## Paletas de color (rotación automática)

El color se asigna solo según el número de post:

| Post # | Paleta |
|---|---|
| 1, 4, 7, 10… (múltiplos de 3 + 1) | 🟠 **Naranja Fuego** — fondo negro, brillo naranja |
| 2, 5, 8, 11… (múltiplos de 3 + 2) | 🔵 **Celestial** — fondo negro, brillo azul/morado |
| 3, 6, 9, 12… (múltiplos de 3) | ⬜ **Blanco Limpio** — fondo blanco, texto oscuro |

Para forzar una paleta específica en un post, no es necesario — la rotación automática garantiza variedad visual.

---

## Tipos de slide disponibles

| `tipo` | Descripción | Cuándo usarlo |
|---|---|---|
| `cover` | Portada con título grande | Siempre el slide 1 |
| `lista` | Bullets con puntos redondos | Enumerar características o beneficios |
| `pasos` | Números grandes + texto | Tutoriales paso a paso |
| `tips` | Cards con borde de color | Consejos o advertencias |
| `comparacion` | Tabla de 3 columnas | Comparar herramientas o opciones |
| `cta` | Pantalla de cierre | Siempre el último slide |
| `cta_final` | Cierre especial (post 60) | Solo para el post final de la serie |

---

## Estructura recomendada de un carrusel

```
Slide 1: cover         → gancho / título impactante
Slide 2: lista/pasos   → el problema o contexto
Slide 3: lista/tips    → la solución o contenido principal
Slide 4: comparacion   → opcional, si hay datos que comparar
Slide 5: cta           → seguir + compartir
```

**Mínimo recomendado:** 4 slides (cover + 2 contenido + cta)
**Máximo recomendado:** 7 slides

---

## Flujo completo para publicar

```
1. Edita gen-slides.js  →  agrega tu nuevo post en el array POSTS
2. Corre: node gen-slides.js [num] [num]
3. Revisa las imágenes en ig/post-XX/
4. Abre guia-publicacion-60-posts.txt  →  copia el caption y hashtags
5. Sube las imágenes a Instagram como carrusel
6. Pega el caption y los hashtags
7. Publica en el horario de mayor alcance (usa Meta Suite para programar)
```

---

## Horarios recomendados para Guatemala (GMT-6)

| Día | Hora | Por qué |
|---|---|---|
| Lunes | 7:00 am | Inicio de semana, gente revisando el teléfono |
| Miércoles | 12:00 pm | Pausa del mediodía |
| Jueves | 6:00 pm | Fin de jornada laboral |
| Sábado | 9:00 am | Mañana de fin de semana |

---

## Si la sesión se cierra y necesitas regenerar

El generador tiene checkpoints automáticos. Si se interrumpe, identifica el último post generado y corre:

```bash
node gen-slides.js [siguiente] 60
# Ejemplo: si se quedó en el post 23:
node gen-slides.js 24 60
```

Los posts ya generados NO se sobreescriben si ya existen los PNGs, el script los salta.

---

## Requisitos para correr el generador

- Node.js instalado (v18 o superior)
- Puppeteer instalado: `npm install` (ya está en package.json)
- Conexión a internet NO necesaria (todo es local)
