"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // load dari localStorage saat pertama kali mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
    setLoaded(true);
  }, []);

  // simpan ke localStorage tiap kali favorites berubah
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const isFavorite = (userId) => favorites.some((u) => u.id === userId);

  const toggleFavorite = (user) => {
    setFavorites((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id) // Remove from Favourite
        : [...prev, user]                       // Add to Favourite
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}