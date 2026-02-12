import { Stack } from "expo-router";
import { FavoriteProvider } from "../src/context/FavoriteContext";

export default function RootLayout() {
  return (
    <FavoriteProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </FavoriteProvider>
  );
}
