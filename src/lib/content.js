import { currentLanguage } from './language.js';

export function t(localizedValue, ...args) {
  if (!localizedValue) return '';
  const value = localizedValue[currentLanguage];
  if (typeof value === 'function') {
    return value(...args);
  }
  return value;
}
