import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/app/authentication/contexts/AuthContext";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import GluestackButton from "@/components/ui/GluestackButton";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useSession();

  return (
    <View style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Se connecter
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Username"
          placeholderTextColor="#999"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <GluestackButton
          title="Se connecter"
          variant="primary"
          size="md"
          onPress={() => signIn(username, password)}
        />
      </View>
      <Link
        style={styles.forgotPasswordLink}
        href={"/authentication/screens/resetPassword"}
      >
        <ThemedText style={styles.forgotPasswordText}>
          Mot de passe oublié ?
        </ThemedText>
      </Link>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: Colors.light.primary,
  },
  eyeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 16,
  },
  forgotPasswordLink: {
    marginTop: 16,
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: Colors.light.primary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
