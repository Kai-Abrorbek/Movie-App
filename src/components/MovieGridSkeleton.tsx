import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const MovieGridSkeleton = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder style={styles.poster} />
      <ShimmerPlaceHolder style={styles.title} />
      <ShimmerPlaceHolder style={styles.rating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    marginBottom: 16,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  title: {
    width: "80%",
    height: 14,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: "center",
  },
  rating: {
    width: "50%",
    height: 12,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: "center",
  },
});
