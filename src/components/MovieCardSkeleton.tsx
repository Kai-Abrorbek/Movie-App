import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const MovieCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder style={styles.poster} />
      <View style={styles.info}>
        <ShimmerPlaceHolder style={styles.title} />
        <ShimmerPlaceHolder style={styles.rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  title: {
    width: 150,
    height: 18,
    borderRadius: 4,
    marginBottom: 8,
  },
  rating: {
    width: 60,
    height: 14,
    borderRadius: 4,
  },
});
