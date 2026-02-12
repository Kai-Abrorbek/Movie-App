import { TMDB_CONFIG } from "../../constants/config";
import { MovieResponse, Movie } from "../types/movie";

export const tmdbApi = {
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}&language=ko-KR&page=${page}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  },

  getMovieDetail: async (id: number): Promise<Movie> => {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}&language=ko-KR`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie detail");
    }

    return response.json();
  },

  searchMovie: async (query: string) => {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${query}&include_adult=false&language=ko-KR&page=1`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie detail");
    }

    return response.json();
  },

  getImageUrl: (path: string | null, size: string = "w500"): string => {
    if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
  },
};
