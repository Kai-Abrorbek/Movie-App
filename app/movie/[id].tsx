import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { tmdbApi } from "../../src/api/tmdb";
import { Movie } from "../../src/types/movie";
import { MovieDetailSkeleton } from "../../src/components/MovieDetailSkeleton";

export default function MovieDetailScreen() {
  const { id, data } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetail();
  }, [id]);

  const loadMovieDetail = async () => {
    try {
      const data = await tmdbApi.getMovieDetail(Number(id));
      setMovie(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text>영화를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: tmdbApi.getImageUrl(movie.backdrop_path, "w780") }}
        style={styles.backdrop}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>
          ⭐ {movie.vote_average.toFixed(1)} / 10
        </Text>
        <Text style={styles.releaseDate}>개봉일: {movie.release_date}</Text>
        <Text style={styles.overviewTitle}>줄거리</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
});
