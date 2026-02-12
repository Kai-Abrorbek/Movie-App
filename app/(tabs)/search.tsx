import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Movie } from "../../src/types/movie";
import { tmdbApi } from "../../src/api/tmdb";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  // TODO: 너가 이 함수 구현하면 됨
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await tmdbApi.searchMovie(query);
      setMovies(data.results);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 검색바 */}
      <View style={styles.searchBar}>
        <MaterialIcons
          name="search"
          size={24}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="영화 제목을 입력하세요"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialIcons name="close" size={24} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* 로딩 */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#e50914" />
        </View>
      )}

      {/* 초기 상태 (검색 전) */}
      {!loading && movies.length === 0 && searchQuery.length === 0 && (
        <View style={styles.centered}>
          <MaterialIcons name="search" size={64} color="#ddd" />
          <Text style={styles.emptyText}>영화를 검색해보세요</Text>
        </View>
      )}

      {/* 검색 결과 없음 */}
      {!loading && movies.length === 0 && searchQuery.length > 0 && (
        <View style={styles.centered}>
          <MaterialIcons name="movie-filter" size={64} color="#ddd" />
          <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
          <Text style={styles.emptySubText}>다른 키워드로 검색해보세요</Text>
        </View>
      )}

      {/* 검색 결과 */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieCard}
            onPress={() => router.push(`/movie/${item.id}`)}
          >
            <Image
              source={{ uri: tmdbApi.getImageUrl(item.poster_path) }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 16,
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 8,
  },
  row: {
    paddingHorizontal: 8,
    gap: 13,
  },
  movieCard: {
    width: "30%",
    marginBottom: 16,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});
