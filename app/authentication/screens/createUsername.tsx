import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";

export default function CreateUsername() {
  const [username, onChangeUsername] = useState("");
  const router = useRouter();

  const getUserExist = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.10:8000/register/get-user-exist/?username=${username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data: { exists: boolean; message: string } = await response.json();
      if (data.exists) {
        return;
      }
      router.push({
        pathname: "/authentication/screens/signUp",
        params: { username },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Créez un pseudo
        </ThemedText>
      </ThemedView>
      <View style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username?.toLowerCase()}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !Boolean(username) && styles.continueButtonDisabled,
          ]}
          disabled={!Boolean(username)}
          onPress={getUserExist}
        >
          <ThemedText style={styles.continueButtonText}>Continuer</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 40,
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
  continueButton: {
    backgroundColor: Colors.light.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
