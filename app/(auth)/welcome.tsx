import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import ScreenLayout from "@/components/ScreenLayout";
import LogoBullUP from "@/components/LogoBullUp";
import { Typography } from "@/constants/Typography";

export default function Welcome() {
  const router = useRouter();
  return (
    <ScreenLayout>
      <ThemedView className={"flex-1 justify-center items-center gap-5"}>
        <LogoBullUP size={Typography.sizes["7xl"]} />
        <ThemedText style={styles.subtitle}>Rejoignez la communauté</ThemedText>
      </ThemedView>

      <ThemedView className={"gap-6 pb-12 w-full"}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          onPress={() => router.navigate("/(auth)/create-username")}
        >
          <ButtonText>Créer un compte</ButtonText>
        </Button>

        <ThemedView className={"flex-row justify-center items-center"}>
          <ThemedText style={styles.loginText}>Déjà inscrit ? </ThemedText>
          <TouchableOpacity onPress={() => router.navigate("/(auth)/login")}>
            <ThemedText style={styles.loginLink}>Se connecter</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.light.primary,
    fontSize: Typography.sizes.lg,
    textAlign: "center",
    opacity: 0.8,
  },
  loginText: {
    color: Colors.light.primary,
    fontSize: Typography.sizes.base,
  },
  loginLink: {
    color: Colors.light.primary,
    fontSize: Typography.sizes.base,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
