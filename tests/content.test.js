import { describe, it, expect } from 'vitest';
import { profile, skills } from '../src/data/profile';
import { technologies } from '../src/data/technologies';
import { projects } from '../src/data/projects';
import { experience } from '../src/data/experience';
import { ui } from '../src/data/ui';

function checkLocalized(val, fieldName = '') {
  expect(val).toBeDefined();
  expect(val).toHaveProperty('es');
  expect(val).toHaveProperty('en');
  expect(val.es).not.toBe('');
  expect(val.en).not.toBe('');
  
  if (typeof val.es === 'string') {
    expect(val.es).not.toContain('[PLACEHOLDER]');
  }
  if (typeof val.en === 'string') {
    expect(val.en).not.toContain('[PLACEHOLDER]');
  }
}

describe('Content schema validation', () => {
  it('UI strings are fully localized', () => {
    Object.values(ui).forEach(val => checkLocalized(val));
  });

  it('Profile is valid', () => {
    checkLocalized(profile.title);
    checkLocalized(profile.location);
    checkLocalized(profile.availability);
    checkLocalized(profile.summary);
    
    const countWords = str => str.trim().split(/\s+/).length;
    expect(countWords(profile.summary.es)).toBeLessThanOrEqual(60);
    expect(countWords(profile.summary.en)).toBeLessThanOrEqual(60);
    
    expect(profile.email).toContain('@');
    expect(profile.github.startsWith('https://')).toBe(true);
    expect(profile.linkedin.startsWith('https://')).toBe(true);
    
    profile.spokenLanguages.forEach(lang => {
      checkLocalized(lang.name);
      checkLocalized(lang.level);
    });
  });

  it('Technologies are valid', () => {
    const ids = new Set();
    const categories = ['language', 'framework', 'database', 'platform', 'tooling'];
    
    technologies.forEach(tech => {
      expect(ids.has(tech.id)).toBe(false);
      ids.add(tech.id);
      expect(categories).toContain(tech.category);
      checkLocalized(tech.blurb);
    });
  });

  it('Projects are valid', () => {
    const ids = new Set(projects.map(p => p.id));
    expect(ids.size).toBe(projects.length);
    
    const techIds = new Set(technologies.map(t => t.id));
    
    projects.forEach(project => {
      checkLocalized(project.description);
      expect(project.technologies.length).toBeGreaterThan(0);
      project.technologies.forEach(t => expect(techIds.has(t)).toBe(true));
      
      if (project.repo) expect(project.repo.startsWith('https://')).toBe(true);
      if (project.demo) expect(project.demo.startsWith('https://')).toBe(true);
      
      if (project.image) {
        expect(project.imageWidth).toBeDefined();
        expect(project.imageHeight).toBeDefined();
      }
      
      if (project.relatedTo) {
        expect(ids.has(project.relatedTo)).toBe(true);
        expect(project.relatedTo).not.toBe(project.id);
      }
    });
  });

  it('Experience is valid', () => {
    const types = ['work', 'education', 'certification'];
    experience.forEach(entry => {
      expect(types).toContain(entry.type);
      checkLocalized(entry.role);
      
      expect(entry.period.from).toMatch(/^\d{4}(-\d{2})?$/);
      if (entry.period.to !== null) {
        expect(entry.period.to).toMatch(/^\d{4}(-\d{2})?$/);
        expect(entry.period.to >= entry.period.from).toBe(true);
      }
      
      if (entry.description) {
        checkLocalized(entry.description);
      }
    });
  });
});
