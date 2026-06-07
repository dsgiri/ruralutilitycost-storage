import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ruc_storage_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load favorites", e);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const newFavs = isFav ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('ruc_storage_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
