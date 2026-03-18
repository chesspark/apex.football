"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const MAX_FAVORITES = 5;
const STORAGE_KEY = "apex_favorites";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (playerId: number) => boolean;
  isFavorite: (playerId: number) => boolean;
  canAddMore: boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = useCallback(
    (playerId: number): boolean => {
      if (favorites.includes(playerId)) {
        setFavorites((prev) => prev.filter((id) => id !== playerId));
        return false;
      }
      if (favorites.length >= MAX_FAVORITES) return true;
      setFavorites((prev) => [...prev, playerId]);
      return true;
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (playerId: number) => favorites.includes(playerId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        canAddMore: favorites.length < MAX_FAVORITES,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
