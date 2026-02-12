import { createContext, useEffect, useState } from "react";
import { Movie } from "../types/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieCardSkeleton } from "../../src/components/MovieCardSkeleton";

interface FavoriteContextType {
  favorites: Movie[];
  toggleFavorite: (id: Movie) => void;
  isFavorite: (id: number) => boolean;
}
const STORAGE_KEY = "favorites";

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setFavorites(JSON.parse(data));
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  const toggleFavorite = async (id: Movie) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((m) => m !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
