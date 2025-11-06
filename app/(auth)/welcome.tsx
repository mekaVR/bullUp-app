import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";

export default function Welcome() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Bienvenue
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Rejoignez la communauté BullUp
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonsContainer}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          onPress={() => router.navigate("/(auth)/create-username")}
        >
          <ButtonText>Créer un compte</ButtonText>
        </Button>

        <ThemedView style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>Déjà inscrit ? </ThemedText>
          <TouchableOpacity onPress={() => router.navigate("/(auth)/login")}>
            <ThemedText style={styles.loginLink}>Se connecter</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingTop: 20,
  },
  title: {
    color: Colors.light.primary,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 52,
    paddingVertical: 8,
  },
  subtitle: {
    color: Colors.light.primary,
    fontSize: 18,
    textAlign: "center",
    opacity: 0.8,
  },
  buttonsContainer: {
    gap: 24,
    paddingBottom: 40,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: Colors.light.primary,
    fontSize: 16,
  },
  loginLink: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
