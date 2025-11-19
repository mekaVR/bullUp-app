import { StyleSheet } from "react-native";
import { useState, useRef } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
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
import ScreenLayout from "@/components/ScreenLayout";
import { VStack } from "@/components/ui/vstack";
import { Typography } from "@/constants/Typography";
import { API_DEFAULT_ERROR_MESSAGE } from "@/constants/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    mutateAsync: login,
    isError: isAuthenticationError,
    error: authenticationError,
    isPending,
  } = useLogin();

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
    <ScreenLayout>
      <BackButon />
      <VStack space="xl" className={"w-full"}>
        <ThemedText type={"title"} style={styles.title}>
          Se connecter
        </ThemedText>

        {isAuthenticationError ? (
          <Alert action="error" variant="solid">
            <AlertIcon as={InfoIcon} />
            <AlertText>
              {authenticationError?.response?.data?.message ??
                API_DEFAULT_ERROR_MESSAGE}
            </AlertText>
          </Alert>
        ) : null}

        {/* Username field */}
        <FormControl isInvalid={Boolean(usernameError)}>
          <Input variant="rounded" size="lg">
            <InputField
              onChangeText={(text) => {
                setUsername(text);
                if (usernameError) setUsernameError("");
              }}
              value={username.trim()}
              placeholder="Nom d'utilisateur"
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
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError("");
              }}
              value={password.trim()}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              returnKeyType="send"
              onSubmitEditing={handleLogin}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{passwordError}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Link className={"self-center"} href={"/(auth)/reset-password"}>
          <ThemedText style={styles.forgotPasswordText}>
            Mot de passe oublié ?
          </ThemedText>
        </Link>

        <ThemedView>
          <Button
            className="rounded-full"
            variant="solid"
            size="lg"
            action="primary"
            onPress={handleLogin}
            disabled={isPending}
          >
            <ButtonText>
              {isPending ? "Connexion..." : "Se connecter"}
            </ButtonText>
          </Button>
        </ThemedView>
      </VStack>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.light.primary,
    textAlign: "center",
  },
  forgotPasswordLink: {
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: Colors.light.primary,
    fontSize: Typography.sizes.sm,
    textDecorationLine: "underline",
  },
});
