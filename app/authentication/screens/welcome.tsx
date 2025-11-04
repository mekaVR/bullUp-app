import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import GluestackButton from "@/components/ui/GluestackButton";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Bienvenue
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Rejoignez la communauté BullUp
        </ThemedText>
      </View>

      <View style={styles.buttonsContainer}>
        <GluestackButton
          title="Créer un compte"
          variant="primary"
          size="lg"
          onPress={() =>
            router.navigate("/authentication/screens/createUsername")
          }
        />

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
