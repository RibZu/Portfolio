# Portfolio Simón Riberi Zunino

Este es el repositorio del portfolio personal de Simón Riberi Zunino. Está construido como un sitio estático usando React y Vite, y se despliega automáticamente en Vercel.

## 🛠 Cómo agregar o modificar proyectos

Todo el contenido del sitio, incluyendo los proyectos y las tecnologías, está definido en la carpeta `src/data/`. **No necesitas tocar el código de los componentes de React ni de los estilos** para actualizar tu información.

Para más detalles técnicos y restricciones, lee el [Esquema de Contenido (`contracts/content-schema.md`)](specs/001-portfolio-landing-page/contracts/content-schema.md).

### Flujo de trabajo para agregar un proyecto:

1. **Agrega el proyecto en `src/data/projects.js`:**
   Solo necesitas añadir un nuevo objeto al array `projects` con la información de tu proyecto (nombre, descripción bilingüe, enlace al repo, enlace a demo, etc.).
   *Las descripciones se deben escribir pensando en un reclutador no técnico.*
2. **Asegúrate de que las tecnologías existan:**
   Los IDs usados en el array `technologies` deben existir en `src/data/technologies.js`. Si vas a usar una tecnología nueva, agrégala primero en `src/data/technologies.js`.
3. **Imágenes:**
   Si tu proyecto incluye una imagen, guárdala en `public/img/projects/` en formato `.webp` y especifica las propiedades `image`, `imageWidth` e `imageHeight` en `projects.js`.
4. **Guarda y sube (Push):**
   Al subir los cambios a la rama `main` en GitHub, Vercel los detectará automáticamente. El nuevo proyecto aparecerá, los filtros de tecnologías se crearán si corresponde, las cantidades se re-calcularán y el estado de la habilidad pasará a "demostrada" sin que tengas que editar ninguna otra cosa.
