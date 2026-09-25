export const projects = [
  {
    id: 'api-digesto',
    name: 'API Digesto',
    description: { 
      es: 'API REST en Go que expone los llamados a concursos docentes de la UNSL: lee en paralelo los feeds RSS de cada facultad y los devuelve como JSON, listos para consumir.', 
      en: 'REST API in Go that exposes UNSL teaching-position contests: it reads the RSS feeds of each faculty in parallel and returns them as ready-to-use JSON.' 
    },
    technologies: ['go', 'docker'],
    repo: 'https://github.com/RibZu/API-DIGESTO',
    demo: 'https://api-concursos-gilt.vercel.app',
    featured: true,
    order: 1,
  },
  {
    id: 'gis-lacis',
    name: 'GIS-LACIS',
    description: { 
      es: 'Aplicación web en Go con PostgreSQL y renderizado en servidor para gestionar el sitio de un laboratorio: proyectos, tesis, integrantes, premios y empresas colaboradoras, con panel de administración por roles.', 
      en: 'Web application in Go with PostgreSQL and server-side rendering to manage the site of a lab: projects, theses, members, awards and partner companies, with a role-based admin panel.' 
    },
    technologies: ['go', 'javascript', 'postgresql'],
    repo: 'https://github.com/RibZu/GIS-LACIS',
    order: 2,
  },
  {
    id: 'digesto-unsl',
    name: 'Digesto UNSL',
    description: { 
      es: 'SPA en React que reemplaza el sitio legacy en PHP del Digesto Administrativo de la UNSL: búsqueda de documentos, novedades, concursos y planes de estudio, más un panel administrativo protegido.', 
      en: 'React SPA replacing the legacy PHP site of the UNSL Administrative Digest: search for documents, news, contests and study plans, plus a protected admin panel.' 
    },
    technologies: ['javascript', 'react'],
    repo: 'https://github.com/RibZu/DigestoUNSL',
    order: 3,
  },
  {
    id: 'my-car-app',
    name: 'My Car App',
    description: { 
      es: 'Sistema web de alquiler de vehículos en PHP y CodeIgniter: catálogo público, reservas con calendario de disponibilidad y panel de administración para flota, clientes, alquileres y reportes.', 
      en: 'Vehicle rental web system in PHP and CodeIgniter: public catalog, bookings with an availability calendar, and an admin panel for fleet, customers, rentals and reports.' 
    },
    technologies: ['php', 'mysql', 'javascript'],
    repo: 'https://github.com/RibZu/MyCarApp',
    relatedTo: 'my-car-app-mobile',
    order: 4,
  },
  {
    id: 'my-car-app-mobile',
    name: 'My Car App Mobile',
    description: { 
      es: 'App Android nativa para explorar un catálogo de vehículos por marca, simular un alquiler con validaciones y guardar el historial en una base SQLite local.', 
      en: 'Native Android app to browse a vehicle catalog by brand, simulate a rental with validations and store the history in a local SQLite database.' 
    },
    technologies: ['java-android'],
    repo: 'https://github.com/RibZu/MyCarAppMobile',
    relatedTo: 'my-car-app',
    order: 5,
  },
  {
    id: 'red-social-artesanos',
    name: 'Red Social Artesanos',
    description: { 
      es: 'Red social para artesanos en PHP puro: álbumes de fotos con privacidad, seguimiento con aprobación, likes y comentarios vía AJAX, y un feed ordenado por popularidad.', 
      en: 'Social network for artisans in plain PHP: photo albums with privacy settings, follow requests with approval, likes and comments via AJAX, and a popularity-ranked feed.' 
    },
    technologies: ['php', 'mysql', 'javascript'],
    repo: 'https://github.com/RibZu/RedSocialArtesanos',
    image: '/img/projects/red-social-artesanos.webp',
    imageWidth: 800,
    imageHeight: 450,
    order: 6,
  },
  {
    id: 'noticias-institucionales',
    name: 'Noticias Institucionales',
    description: { 
      es: 'Sistema editorial de noticias institucionales en PHP y MySQL con flujo Borrador → Validación → Publicación, tres roles (editor, validador, administrador) y expiración automática.', 
      en: 'Editorial system for institutional news in PHP and MySQL with a Draft → Review → Published workflow, three roles (editor, reviewer, admin) and automatic expiration.' 
    },
    technologies: ['php', 'mysql'],
    repo: 'https://github.com/RibZu/NoticiasInstitucionales',
    order: 7,
  },
  {
    id: 'tyh-noticias',
    name: 'TyH Noticias',
    description: { 
      es: 'Sistema de gestión, validación y publicación de noticias con MVC manual en PHP: portal público con búsqueda y destacadas, panel por roles y auditoría de cada cambio.', 
      en: 'News management, review and publishing system with a hand-built PHP MVC: public portal with search and featured items, role-based dashboard and an audit trail of every change.' 
    },
    technologies: ['php', 'mysql'],
    repo: 'https://github.com/RibZu/TyH-Noticias',
    image: '/img/projects/tyh-noticias.webp',
    imageWidth: 800,
    imageHeight: 450,
    order: 8,
  }
];
