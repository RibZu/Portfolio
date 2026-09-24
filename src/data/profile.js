export const profile = {
  name: "Simón Riberi",
  title: { es: "Desarrollador de Software", en: "Software Developer" },
  summary: { 
    es: "Desarrollador Web graduado en la UNSL. Construyo aplicaciones web de alto rendimiento enfocadas en resolver problemas reales.", 
    en: "Web Developer graduated from UNSL. I build high-performance web applications focused on solving real problems." 
  },
  email: "simonriberizunino@gmail.com",
  github: "https://github.com/RibZu",
  linkedin: "https://www.linkedin.com/in/simon-riberi-5a28bb238/",
  cv: [
    { id: "es", label: "ES", name: { es: "en español", en: "in Spanish" }, href: "/cv/CV_Simon_Riberi_ES.pdf" },
    { id: "en", label: "EN", name: { es: "en inglés", en: "in English" }, href: "/cv/CV_Simon_Riberi_EN.pdf" },
  ],
  spokenLanguages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "B2 (FCE)", en: "B2 (FCE)" } },
  ],
  ogImage: { es: "/og/og-es.png", en: "/og/og-en.png" },
};

export const skills = [
  { technologyId: "javascript", order: 1 },
  { technologyId: "go", order: 2 },
  { technologyId: "typescript", order: 3 },
  { technologyId: "react", order: 4 },
  { technologyId: "node", order: 5 },
];
