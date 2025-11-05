import { Image } from "expo-image";
import { Button, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/app/authentication/contexts/AuthContext";
import useGetComicBooks from "@/services/comicBook/hooks/useGetComicBooks";

export default function HomeScreen() {
  const { logOut } = useSession();
  const { data } = useGetComicBooks();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <Button title={"Logout"} onPress={logOut} />
      </ThemedView>
      <ThemedText>Liste de BD</ThemedText>
      <ThemedView style={styles.bdList}>
        {data?.results.map((comicBook) => (
          <ThemedText key={comicBook.id} type="subtitle">
            {comicBook.title}
          </ThemedText>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bdList: {
    flexDirection: "column",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
