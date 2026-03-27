const FAVORITES_KEY = 'vibe-ui-favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}

export function toggleFavorite(effectId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(effectId);
  const isFavorite = index > -1;
  
  if (isFavorite) {
    favorites.splice(index, 1);
  } else {
    favorites.push(effectId);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return !isFavorite;
}

export function isFavorite(effectId: string): boolean {
  return getFavorites().includes(effectId);
}
