import { create } from "zustand";
import { Movie } from "../types/movie";

interface FavoriteStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  addFavorite: (movie) => {
    set((store) => ({
      favorites: [...store.favorites, movie],
    }));
  },
  removeFavorite: (id) => {
    set((store) => ({
      favorites: store.favorites.filter((m) => m.id !== id),
    }));
  },

  isFavorite: (id) => {
    return get().favorites.some((m) => m.id === id);
  },
}));
