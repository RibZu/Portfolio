import { describe, it, expect } from 'vitest';
import {
  projectsByTechnology,
  technologyCounts,
  visibleFilters,
  filterProjects,
  isDemonstrated,
  sortExperience
} from '../src/lib/derive';

describe('derive functions', () => {
  const mockProjects = [
    { id: 'p1', name: 'Zebra', featured: false, order: 2, technologies: ['react'] },
    { id: 'p2', name: 'Alpha', featured: true, order: 1, technologies: ['react', 'node'] },
    { id: 'p3', name: 'Beta', featured: false, order: 1, technologies: ['go'] },
    { id: 'p4', name: 'Gamma', featured: false, order: 1, technologies: ['go'] }
  ];

  const mockTechs = [
    { id: 'react', category: 'framework' },
    { id: 'node', category: 'tooling' },
    { id: 'go', category: 'language' },
    { id: 'php', category: 'language' }
  ];

  it('projectsByTechnology maps correctly', () => {
    const map = projectsByTechnology(mockProjects);
    expect(map['react'].length).toBe(2);
    expect(map['node'].length).toBe(1);
    expect(map['go'].length).toBe(2);
    expect(map['php']).toBeUndefined();
  });

  it('technologyCounts counts correctly', () => {
    const counts = technologyCounts(mockProjects);
    expect(counts['react']).toBe(2);
    expect(counts['node']).toBe(1);
    expect(counts['php']).toBeUndefined();
  });

  it('visibleFilters returns tech with >0 projects, grouped by category', () => {
    const filters = visibleFilters(mockProjects, mockTechs);
    expect(filters.map(f => f.id)).toEqual(['go', 'react', 'node']); // language, framework, tooling; php omitted
  });

  it('visibleFilters keeps array order within a category', () => {
    const projects = [
      { id: 'a', technologies: ['php', 'go', 'javascript'] }
    ];
    const techs = [
      { id: 'javascript', category: 'language' },
      { id: 'go', category: 'language' },
      { id: 'php', category: 'language' }
    ];
    expect(visibleFilters(projects, techs).map(f => f.id)).toEqual(['javascript', 'go', 'php']);
  });

  it('visibleFilters puts unknown categories last', () => {
    const projects = [{ id: 'a', technologies: ['x', 'go'] }];
    const techs = [
      { id: 'x', category: 'mystery' },
      { id: 'go', category: 'language' }
    ];
    expect(visibleFilters(projects, techs).map(f => f.id)).toEqual(['go', 'x']);
  });

  it('filterProjects sorts by featured desc, order asc, name asc', () => {
    const sorted = filterProjects(mockProjects, null);
    expect(sorted[0].id).toBe('p2'); // featured
    expect(sorted[1].id).toBe('p3'); // order 1, Beta
    expect(sorted[2].id).toBe('p4'); // order 1, Gamma
    expect(sorted[3].id).toBe('p1'); // order 2
  });

  it('filterProjects filters by techId', () => {
    const filtered = filterProjects(mockProjects, 'node');
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('p2');
  });

  it('isDemonstrated returns true if tech is used', () => {
    expect(isDemonstrated('react', mockProjects)).toBe(true);
    expect(isDemonstrated('php', mockProjects)).toBe(false);
  });

  it('sortExperience sorts reverse chronological, null first', () => {
    const mockExp = [
      { id: 'e1', period: { from: '2020', to: '2021' } },
      { id: 'e2', period: { from: '2022', to: null } },
      { id: 'e3', period: { from: '2019', to: '2020' } },
      { id: 'e4', period: { from: '2021', to: '2022' } }
    ];
    const sorted = sortExperience(mockExp);
    expect(sorted[0].id).toBe('e2'); // null to
    expect(sorted[1].id).toBe('e4'); // 2021
    expect(sorted[2].id).toBe('e1'); // 2020
    expect(sorted[3].id).toBe('e3'); // 2019
  });
});
