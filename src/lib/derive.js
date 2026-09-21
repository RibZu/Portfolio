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

export function visibleFilters(projects, technologies) {
  const counts = technologyCounts(projects);
  const visibleIds = Object.keys(counts);
  const visibleTechs = technologies.filter(t => visibleIds.includes(t.id));
  return visibleTechs.sort((a, b) => counts[b.id] - counts[a.id]);
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
