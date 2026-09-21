export const currentLanguage = document.documentElement.lang || 'es';

export function setLanguagePreference(lang) {
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {
    // Ignore error if storage is blocked
  }
}

export function getOppositePath() {
  return currentLanguage === 'es' ? '/en/' : '/';
}
