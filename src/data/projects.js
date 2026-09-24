export const projects = [
  {
    id: 'api-digesto',
    name: 'API Digesto',
    description: { 
      es: 'API de gestión documental y normativa para concursos docentes, que estandariza el manejo de reglamentaciones con alta disponibilidad.', 
      en: 'Document management and regulatory API for teaching contests, standardizing regulation handling with high availability.' 
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
      es: 'Sistema de información geográfica para administrar datos geoespaciales críticos.', 
      en: 'Geographic information system to manage critical geospatial data.' 
    },
    technologies: ['go', 'javascript', 'postgresql'],
    repo: 'https://github.com/RibZu/GIS-LACIS',
    order: 2,
  },
  {
    id: 'digesto-unsl',
    name: 'DigestoUNSL',
    description: { 
      es: 'Plataforma Frontend para la visualización y búsqueda eficiente de normativas universitarias.', 
      en: 'Frontend platform for viewing and efficiently searching university regulations.' 
    },
    technologies: ['javascript', 'react'],
    repo: 'https://github.com/RibZu/DigestoUNSL',
    order: 3,
  },
  {
    id: 'my-car-app',
    name: 'MyCarApp',
    description: { 
      es: 'Aplicación para el seguimiento de mantenimiento vehicular y gestión de gastos.', 
      en: 'Application for tracking vehicle maintenance and managing expenses.' 
    },
    technologies: ['php', 'mysql', 'javascript'],
    repo: 'https://github.com/RibZu/MyCarApp',
    relatedTo: 'my-car-app-mobile',
    order: 4,
  },
  {
    id: 'my-car-app-mobile',
    name: 'MyCarAppMobile',
    description: { 
      es: 'Versión móvil nativa para el sistema de gestión de vehículos.', 
      en: 'Native mobile version for the vehicle management system.' 
    },
    technologies: ['java-android'],
    repo: 'https://github.com/RibZu/MyCarAppMobile',
    relatedTo: 'my-car-app',
    order: 5,
  },
  {
    id: 'red-social-artesanos',
    name: 'RedSocialArtesanos',
    description: { 
      es: 'Comunidad en línea para artesanos locales, permitiendo compartir productos y conectar con clientes.', 
      en: 'Online community for local artisans, enabling product sharing and customer connections.' 
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
    name: 'NoticiasInstitucionales',
    description: { 
      es: 'Portal de noticias corporativo para centralizar comunicaciones internas.', 
      en: 'Corporate news portal to centralize internal communications.' 
    },
    technologies: ['php', 'mysql'],
    repo: 'https://github.com/RibZu/NoticiasInstitucionales',
    order: 7,
  },
  {
    id: 'tyh-noticias',
    name: 'TyH-Noticias',
    description: { 
      es: 'Sistema de gestión de contenido periodístico con panel de administración.', 
      en: 'Journalistic content management system with an administration dashboard.' 
    },
    technologies: ['php', 'mysql'],
    repo: 'https://github.com/RibZu/TyH-Noticias',
    image: '/img/projects/tyh-noticias.webp',
    imageWidth: 800,
    imageHeight: 450,
    order: 8,
  }
];
