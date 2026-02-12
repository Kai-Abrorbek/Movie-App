import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFavorite } from "../../src/hooks/useFavorite";
import { tmdbApi } from "../../src/api/tmdb";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavorite();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>찜한 영화</Text>
      <FlatList
        data={favorites}
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
        ListEmptyComponent={
          <Text style={styles.empty}>아직 찜한 영화가 없습니다</Text>
        }
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    flex: 1,
  },
  favItems: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#a87b08",
    borderRadius: 8,
  },
  poster: {
    width: 110,
    height: 150,
    borderRadius: 8,
  },
  info: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
    width: 110,
  },
  row: {
    paddingHorizontal: 8,
    gap: 13,
  },
  movieCard: {
    width: "30%",
    marginBottom: 16,
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
