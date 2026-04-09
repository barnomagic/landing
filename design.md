# Design System — Pausa

> Brújula de diseño para la landing. Cada decisión visual debe responder a una pregunta simple: **¿Esto se siente como una pausa?**

---

## Fuente de inspiración: @346eur

Perfil de referencia en Threads: **Mohamed (@346eur)**

**Bio:** *"Creatively Messy! All things Art & Design Palette By Day!"*

**Lo que define su estética:**
- Paletas de colores **nombradas y con personalidad** (no "primary/secondary" — cada color tiene un nombre propio)
- Cada paleta **cuenta una historia** o evoca una emoción concreta
- Contenido: tendencias diseño 2026, paletas inspiradas en naturaleza, tormentas, cumpleaños
- Tono: creativo, juguetón pero sofisticado, de comunidad de diseñadores
- Posts típicos: *"¿Qué título le pondrías a esta paleta?"*, *"Si fueras una paleta de colores"*, *"Save these for later!"*
- Produce recursos descargables (Palette By Day — 346kit.gumroad.com)

**Qué adoptamos de @346eur para Pausa:**
- Los colores tienen nombre, no código anónimo
- Las paletas evocan escenas específicas (un living a la tarde, luz de ventana)
- El diseño tiene que sentirse **curado**, no generado
- El blanco/espacio vacío es parte del diseño, no ausencia de él

---

## La Marca — Pausa

**Propuesta de valor:** No vendemos un producto. Vendemos la puesta en escena del living.

**Personalidad:**
- Cálida, no fría
- Sofisticada, no elitista
- Artesanal, no industrial
- Pausada, no urgente
- A medida, no genérica

**Palabras clave de diseño:** stillness · craft · warmth · editorial · curated · scene

---

## Paleta de Colores — "La Tarde en el Living"

Inspirada en el lenguaje de @346eur: paletas con nombre propio que cuentan una escena.

| Nombre       | Hex       | Uso principal                              |
|--------------|-----------|---------------------------------------------|
| **Crema**    | `#F5F0E8` | Background principal, aire, respiro         |
| **Arena**    | `#E8D5B7` | Fondos secundarios, secciones alternas      |
| **Terracota**| `#C17B5C` | CTA principal, acentos, botones             |
| **Oliva**    | `#8B9467` | Detalles naturales, íconos, bordes suaves   |
| **Madera**   | `#3D2B1F` | Texto principal, headings, ancla oscura     |
| **Dorado**   | `#B8954A` | Highlights, detalles de lujo, hover states  |
| **Blanco**   | `#FEFCF8` | Cards, espacios limpios, contraste máximo   |

**Reglas de la paleta:**
- Fondo casi siempre Crema o Blanco — nunca blanco puro `#FFFFFF`
- Texto principal en Madera — nunca negro puro `#000000`
- El CTA es Terracota. Siempre. No hay segundo color para botones primarios.
- Oliva y Dorado son acentos, no protagonistas.

---

## Tipografía

### Headings — `Playfair Display` (serif editorial)
- Evoca publicaciones de diseño de interiores, editoriales de lujo accesible
- Se usa en H1, H2, frases de impacto
- Peso: 400 (regular) para elegancia, 700 (bold) solo para el hero

### Body — `Inter` (sans-serif limpia)
- Legibilidad en pantalla, neutral, moderna
- Texto corrido, labels, navegación
- Peso: 400 normal, 500 medium

### Escala tipográfica base:
```
Hero H1:    3.5rem / 56px  — Playfair Display Bold
H2:         2rem   / 32px  — Playfair Display Regular
H3:         1.25rem/ 20px  — Inter Medium
Body large: 1.125rem/18px  — Inter Regular
Body:       1rem   / 16px  — Inter Regular
Caption:    0.875rem/14px  — Inter Regular
```

---

## Espaciado y Layout

- **Máximo ancho de contenido:** `1200px`
- **Padding lateral en mobile:** `24px`
- **Padding lateral en desktop:** `80px`
- Secciones con `padding-y` generoso: mínimo `80px` en desktop, `48px` en mobile
- El espacio en blanco es intencional y parte del diseño — **no comprimir**

---

## Principios de Diseño Visual

### 1. La escena, no el producto
Las imágenes muestran el sillón **en contexto** (en un living, con luz natural, con plantas) — nunca sobre fondo blanco como catálogo.

### 2. Cada sección respira
Entre secciones hay aire. No hay información en loop infinito. El visitante hace una pausa.

### 3. Editorialmente curado
El layout se inspira en revistas de interiorismo (AD, Casa Vogue): grids asimétricos, fotos que se cortan en los bordes, texto que respira.

### 4. Colores nombrados, no anónimos
Cuando referencies colores en código, usá variables con nombres del sistema:
```css
--color-crema:    #F5F0E8;
--color-arena:    #E8D5B7;
--color-terracota:#C17B5C;
--color-oliva:    #8B9467;
--color-madera:   #3D2B1F;
--color-dorado:   #B8954A;
--color-blanco:   #FEFCF8;
```

### 5. Sin border-radius agresivo
- Botones: `border-radius: 4px` — no pills, no cuadrado puro
- Cards: `border-radius: 8px`
- Imágenes: sin border-radius (o `2px` máximo)

### 6. Sombras cálidas, no frías
```css
box-shadow: 0 4px 24px rgba(61, 43, 31, 0.08);  /* sombra Madera */
```
Nunca sombras azul-grisáceas por defecto.

---

## Componentes Clave

### Botón primario
```
Background: Terracota (#C17B5C)
Text: Blanco (#FEFCF8)
Hover: Madera (#3D2B1F)
Padding: 14px 32px
Border-radius: 4px
Font: Inter Medium 16px
Letter-spacing: 0.5px
```

### Botón secundario / outline
```
Border: 1.5px solid Madera (#3D2B1F)
Text: Madera
Hover background: Arena (#E8D5B7)
```

### Navbar
- Fondo: Crema (#F5F0E8) con sombra muy sutil al scrollear
- Logo: texto "Pausa" en Playfair Display, color Madera
- Links: Inter Regular, color Madera, hover Terracota

### Hero
- Background: Crema o foto de ambiente
- H1: Playfair Display Bold, color Madera
- Subtítulo: Inter Regular, color Madera con opacidad 0.7
- CTA: botón Terracota

---

## Tono Visual por Sección

| Sección          | Paleta dominante       | Sensación buscada          |
|------------------|------------------------|----------------------------|
| Hero             | Crema + Madera         | Calma, presencia, impacto  |
| Quiénes somos    | Arena + Oliva          | Orgánico, confiable        |
| Productos        | Blanco + fotos         | Editorial, galería limpia  |
| Por qué elegirnos| Madera (oscuro)        | Autoridad, profundidad     |
| Contacto         | Terracota suave        | Invitación cálida          |

---

## Lo que NO es Pausa

- ❌ Colores saturados o vibrantes
- ❌ Fonts sans-serif geométricas frías (Futura, Montserrat solo)
- ❌ Layouts congestionados
- ❌ Efectos de parallax exagerados
- ❌ Animaciones que distraigan
- ❌ CTAs en verde o azul
- ❌ Fotos de catálogo sobre fondo blanco
- ❌ Gradients degradados digitales
- ❌ Bordes redondeados tipo "app móvil"

---

## Referencias Visuales

**Cuentas de Threads / Instagram a mirar para inspiración:**
- @346eur — paletas de color, tendencias diseño
- @colours.cafe — curación de paletas (aparece en respuestas de @346eur)
- @awsmcolor — paletas inspiradas en naturaleza

**Revistas / referentes editoriales:**
- AD (Architectural Digest)
- Casa Vogue
- Kinfolk Magazine

---

*Última actualización: abril 2026*
