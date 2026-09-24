export function projectsByTechnology(projects) {
  const map = {};
  for (const project of projects) {
    for (const tech of project.technologies) {
      if (!map[tech]) map[tech] = [];
      map[tech].push(project);
    }
  }
  return map;
}

export function technologyCounts(projects) {
  const map = {};
  for (const project of projects) {
    for (const tech of project.technologies) {
      map[tech] = (map[tech] || 0) + 1;
    }
  }
  return map;
}

// Orden de los grupos en filtros y constelación; dentro de cada grupo manda el orden del array `technologies`.
export const CATEGORY_ORDER = ['language', 'framework', 'database', 'tooling'];

const categoryRank = (tech) => {
  const rank = CATEGORY_ORDER.indexOf(tech.category);
  return rank === -1 ? CATEGORY_ORDER.length : rank;
};

export function visibleFilters(projects, technologies) {
  const counts = technologyCounts(projects);
  return technologies
    .map((tech, index) => ({ tech, index }))
    .filter(({ tech }) => counts[tech.id])
    .sort((a, b) => categoryRank(a.tech) - categoryRank(b.tech) || a.index - b.index)
    .map(({ tech }) => tech);
}

export function filterProjects(projects, technologyId) {
  let filtered = projects;
  if (technologyId) {
    filtered = projects.filter(p => p.technologies.includes(technologyId));
  }
  return [...filtered].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export function isDemonstrated(technologyId, projects) {
  return projects.some(p => p.technologies.includes(technologyId));
}

export function sortExperience(entries) {
  return [...entries].sort((a, b) => {
    if (a.period.to === null && b.period.to !== null) return -1;
    if (b.period.to === null && a.period.to !== null) return 1;
    
    // Reverse chronological by period.from
    if (a.period.from !== b.period.from) {
      return b.period.from.localeCompare(a.period.from);
    }
    return 0;
  });
}
