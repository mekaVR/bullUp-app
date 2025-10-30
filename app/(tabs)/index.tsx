import { Image } from "expo-image";
import { Button, Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { useSession } from "@/app/authentication/contexts/AuthContext";

interface DATA {
  count: number;
  results: [
    {
      title: string;
      id: number;
    },
  ];
}

export default function HomeScreen() {
  const [data, setData] = useState<DATA>();
  const { signOut } = useSession();

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.10:8000/api/comic-book/");
      const data = await response.json();
      setData(data);
      console.log("data", data);
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Button title={"Logout"} onPress={signOut} />
      </ThemedView>
      <ThemedText>Liste de BD</ThemedText>
      <ThemedView style={styles.bdList}>
        {data?.results.map((ouvre) => (
          <ThemedText key={ouvre.id} type="subtitle">
            {ouvre.title}
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
