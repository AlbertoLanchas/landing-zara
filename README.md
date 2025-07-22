# ZARA ORIGINS

## Índice

- [🚀 Cómo Ejecutar el Proyecto](#-cómo-ejecutar-el-proyecto)
- [🛠️ Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [💡 Decisiones Técnicas Clave](#-decisiones-técnicas-clave)
- [♿ Accesibilidad (A11y) y SEO](#-accesibilidad-a11y-y-seo)
- [🧠 Cosas Aprendidas y Reforzadas](#-cosas-aprendidas-y-reforzadas)
- [⏱️ Tiempo Estimado Dedicado](#️-tiempo-estimado-dedicado)

## 🚀 Cómo Ejecutar el Proyecto

Este proyecto es una aplicación web moderna construida con **Vite**, **TypeScript** y **Sass**. Para ponerlo en marcha localmente, se requiere tener **Node.js** y un gestor de paquetes (**npm** o **pnpm**) instalados en el sistema.

### Requisitos Previos

- **Node.js**: Se recomienda tener una versión reciente instalada desde [nodejs.org](https://nodejs.org).
- **npm o pnpm**: Se instalan automáticamente con Node.js o pueden instalarse por separado.

---

### Pasos para la Ejecución

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/AlbertoLanchas/landing-zara
cd landing-zara
```

---

#### 2. Instalar Dependencias

```bash
pnpm install
# o
npm install
```

Esto instalará Vite, TypeScript, Sass y herramientas de testeo (Vitest, jsdom).

---

#### 3. Iniciar el Servidor de Desarrollo

```bash
pnpm run dev
# o
npm run dev
```

Abre el navegador en [http://localhost:5173](http://localhost:5173) por defecto.

---

### Ejecutar Tests (Opcional)

**Ejecutar todos los tests:**

```bash
pnpm vitest
# o
npm vitest
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica, accesibilidad y SEO.
- **Sass (SCSS)**: Estilos modulares y escalables con variables y mixins.
- **TypeScript (TS)**: Robustez y mantenimiento del código.
- **Vitest**: Framework de testing moderno.
- **Vite**: Bundler rápido para desarrollo y producción.

---

## 💡 Decisiones Técnicas Clave

### Enfoque en el Rendimiento y la Ligereza

- Para garantizar un rendimiento excepcional, esta landing page se ha diseñado para ser ligera y rápida. Se han evitado el uso de frameworks de JavaScript complejos (como React, Vue o Angular), lo que reduce la carga de JavaScript, el tamaño del bundle y el tiempo de parseo.

- Además, al ser una página estática sin navegación entre múltiples vistas, no se requiere un sistema de rutas de cliente-side. Esto simplifica la arquitectura y elimina la carga de lógica de enrutamiento innecesaria, contribuyendo directamente a una experiencia de usuario más fluida y eficiente.

---

### Diseño "Pixel Perfect" (1920px) y Adaptabilidad

- Diseño "Pixel Perfect" (1920px): El diseño se ha concebido para ser "pixel perfect" a una resolución base de 1920px de ancho, siguiendo una metodología de diseño precisa.
- Uso de `media queries` para adaptabilidad.

---

### Estética y Efectos Visuales

- Inspiración directa en la web de Zara.
- Hover effects, carrusel y animaciones de scroll con diseño elegante y fluido.

---

### Animaciones con CSS Puro

- Prioridad a `hover effects` y `scroll animations` con CSS puro.
- Mejor rendimiento: CSS es gestionado en el hilo de composición.

---

### Optimización de Carga de Recursos

- `loading="lazy"` en imágenes fuera de vista.
- `defer` en el script principal (`main.ts`) para evitar bloqueos de render.

---

### Gestión de Contenido y Componentización

- No se componentizó `gallery-block` para preservar control visual.
- En proyectos mayores, se evaluaría una componentización con el equipo UX.

---

## ♿ Accesibilidad (A11y) y SEO

- **Etiquetas semánticas**: Mejoran comprensión por lectores de pantalla y SEO.
- **Navegación por tabulación**: Accesibilidad completa con teclado.
- **ARIA labels y roles**: Apoyo para carruseles y componentes complejos.
- **`alt` y `title`** en imágenes: Descripción textual para accesibilidad.
- **Testing manual** de accesibilidad.
- **SEO técnico**: Uso de meta etiquetas (`description`, `keywords`, `Open Graph`).

---

## 🧠 Cosas Aprendidas y Reforzadas

- **Accesibilidad (A11y)**: Atributos ARIA, navegación por teclado.
- **SEO técnico**: Meta etiquetas y rendimiento como factor de posicionamiento.
- **Optimización del rendimiento**: Uso de CSS puro y herramientas ligeras.

---

## ⏱️ Tiempo Estimado Dedicado

**Total:** ~8 horas

### Desglose por tareas:

- **Análisis y planificación:** ~0.5h (comprensión del diseño, estructura HTML, requisitos de rendimiento y accesibilidad).
- **Maquetación base (HTML/SCSS):** ~2h (estructura del documento, estilos iniciales, asegurando el "pixel perfect" a 1920px).
- **Responsive (Media Queries):** ~1h (adaptación del layout a diferentes tamaños de pantalla, asegurando la coherencia del diseño).
- **Animaciones y efectos:** ~1.5h (implementación de hover effects, carousel y scroll animations, priorizando CSS).
- **Funcionalidad TypeScript:** ~1h (lógica interactiva del carousel o animaciones complejas).
- **Testing (Vitest):** ~1h (escritura de tests unitarios básicos para la lógica de TS).
- **Accesibilidad y SEO:** ~1h (revisión y ajuste de atributos ARIA, alt texts, meta tags, y testing manual de tabulación).
- **Redacción README.md:** ~0.5h

---
