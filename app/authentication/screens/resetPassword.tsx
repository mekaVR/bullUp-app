import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import GluestackButton from "@/components/ui/GluestackButton";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // TODO: Implement password reset logic
    console.log("Reset password for:", email);
  };

  return (
    <View style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Mot de passe oublié
        </ThemedText>
      </ThemedView>
      <View style={styles.stepContainer}>
        <ThemedText style={styles.description}>
          Entrez votre email pour recevoir le lien de réinitialisation
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.buttonContainer}>
        <GluestackButton
          title="Envoyer le lien"
          variant="primary"
          size="md"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: Colors.light.primary,
    fontSize: 32,
    fontWeight: "bold",
  },
  stepContainer: {
    gap: 16,
    marginBottom: 32,
  },
  description: {
    color: Colors.light.primary,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.light.primary,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
