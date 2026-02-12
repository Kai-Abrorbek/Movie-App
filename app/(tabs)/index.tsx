import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { tmdbApi } from "../../src/api/tmdb";
import { Movie } from "../../src/types/movie";
import { MaterialIcons } from "@expo/vector-icons";
import { useFavorite } from "../../src/hooks/useFavorite";
import { MovieCardSkeleton } from "../../src/components/MovieCardSkeleton";

export default function HomeScreen() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorite();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    loadMovies();
  }, [page]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await tmdbApi.getPopularMovies(page);

      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMoview = data.results.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newMoview];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && movies.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>인기 영화</Text>
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </View>
    );
  }

  // if (loading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>인기 영화</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!loading) {
            setPage((prev) => prev + 1);
          }
        }}
        renderItem={({ item }) => {
          const isFavorit = isFavorite(item.id);
          return (
            <TouchableOpacity
              style={styles.movieCard}
              onPress={() =>
                router.push({
                  pathname: `/movie/${item.id}`,
                })
              }
            >
              <Image
                source={{ uri: tmdbApi.getImageUrl(item.poster_path) }}
                style={styles.poster}
              />
              <View style={styles.info}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.rating}>
                  ⭐ {item.vote_average.toFixed(1)}
                </Text>
              </View>
              <View style={styles.favoriteBtn}>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                >
                  <MaterialIcons
                    name={isFavorit ? `favorite` : `favorite-outline`}
                    size={30}
                    color={isFavorit ? `red` : ``}
                  />
                </Pressable>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  movieCard: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  favoriteBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    marginLeft: 16,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
});
