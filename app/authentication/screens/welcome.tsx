import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Bienvenue
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Rejoignez la communauté BullUp
        </ThemedText>
      </ThemedView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            router.navigate("/authentication/screens/createUsername")
          }
        >
          <ThemedText style={styles.primaryButtonText}>
            Créer un compte
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>Déjà inscrit ? </ThemedText>
          <TouchableOpacity
            onPress={() => router.navigate("/authentication/screens/login")}
          >
            <ThemedText style={styles.loginLink}>Se connecter</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  primaryButton: {
    backgroundColor: Colors.light.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
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
