import { StyleSheet, View } from "react-native";
import { useState, useRef } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import useLogin from "@/hooks/authentication/useLogin";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import {
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  AlertCircleIcon,
} from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

export default function Login() {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setSession } = useSession();
  const {
    mutateAsync: login,
    isError: isAuthenticationError,
    error: authenticationError,
    isPending,
  } = useLogin(setSession);

  const passwordRef = useRef<any>(null);

  const handleLogin = async () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError("Le nom d'utilisateur est requis");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Le mot de passe est requis");
      hasError = true;
    }

    if (hasError) {
      return;
    }
    await login({ username, password });
  };

  return (
    <ThemedView style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Se connecter
        </ThemedText>
      </ThemedView>

      {isAuthenticationError ? (
        <Alert action="error" variant="solid" style={{ marginBottom: 10 }}>
          <AlertIcon as={InfoIcon} />
          <AlertText>
            {authenticationError.response?.data.detail ||
              "Une erreur est survenue"}
          </AlertText>
        </Alert>
      ) : null}

      <ThemedView style={styles.stepContainer}>
        {/* Username field */}
        <FormControl isInvalid={Boolean(usernameError)}>
          <Input variant="rounded" size="lg">
            <InputField
              onChangeText={(text) => {
                onChangeUsername(text);
                if (usernameError) setUsernameError("");
              }}
              value={username}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#999"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{usernameError}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password field */}
        <FormControl isInvalid={Boolean(passwordError)}>
          <Input variant="rounded" size="lg">
            <InputField
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              onChangeText={(text) => {
                onChangePassword(text);
                if (passwordError) setPasswordError("");
              }}
              value={password}
              placeholder="Mot de passe"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={handleLogin}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{passwordError}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Link style={styles.forgotPasswordLink} href={"/(auth)/reset-password"}>
          <ThemedText style={styles.forgotPasswordText}>
            Mot de passe oublié ?
          </ThemedText>
        </Link>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          onPress={handleLogin}
          disabled={isPending}
        >
          <ButtonText>{isPending ? "Connexion..." : "Se connecter"}</ButtonText>
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
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
  buttonContainer: {
    marginBottom: 16,
  },
  forgotPasswordLink: {
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: Colors.light.primary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
