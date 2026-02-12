import { View, StyleSheet, ScrollView } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const MovieDetailSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <ShimmerPlaceHolder style={styles.backdrop} />

      <View style={styles.content}>
        <ShimmerPlaceHolder style={styles.title} />
        <ShimmerPlaceHolder style={styles.rating} />
        <ShimmerPlaceHolder style={styles.releaseDate} />
        <ShimmerPlaceHolder style={styles.overviewTitle} />
        <ShimmerPlaceHolder style={styles.overviewLine} />
        <ShimmerPlaceHolder style={[styles.overviewLine, { width: "90%" }]} />
        <ShimmerPlaceHolder style={[styles.overviewLine, { width: "70%" }]} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backdrop: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    width: "70%",
    height: 28,
    borderRadius: 4,
    marginBottom: 8,
  },
  rating: {
    width: 100,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  releaseDate: {
    width: 120,
    height: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  overviewTitle: {
    width: 80,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  overviewLine: {
    width: "100%",
    height: 16,
    borderRadius: 4,
    marginBottom: 6,
  },
});
