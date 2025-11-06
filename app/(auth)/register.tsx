import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";
import { useState, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import useRegister from "@/hooks/authentication/useRegister";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import {
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  AlertCircleIcon,
} from "@/components/ui/icon";
import { validateEmail, validatePassword } from "@/utils/authentication";

export default function Register() {
  const [password, onChangePassword] = useState("");
  const [verifyPassword, onChangeVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const { setSession } = useSession();
  const {
    mutateAsync: register,
    isError,
    error: registerError,
    isPending,
  } = useRegister(setSession);
  const { username } = useLocalSearchParams<{ username: string }>();

  const passwordRef = useRef<any>(null);
  const verifyPasswordRef = useRef<any>(null);

  const handleRegister = async () => {
    let hasError = false;

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      hasError = true;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      hasError = true;
    }

    if (!verifyPassword) {
      setVerifyPasswordError("Veuillez confirmer le mot de passe");
      hasError = true;
    } else if (password !== verifyPassword) {
      setVerifyPasswordError("Les mots de passe ne correspondent pas");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    await register({ username, email, password });
  };

  return (
    <ThemedView style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Inscription
        </ThemedText>
      </ThemedView>

      {isError ? (
        <Alert action="error" variant="solid" style={{ marginBottom: 10 }}>
          <AlertIcon as={InfoIcon} />
          <AlertText>{registerError.response?.data.detail}</AlertText>
        </Alert>
      ) : null}

      <View style={styles.stepContainer}>
        {/* Email field */}
        <FormControl isInvalid={Boolean(emailError)}>
          <Input variant="rounded" size="lg">
            <InputField
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
              }}
              value={email}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{emailError}</FormControlErrorText>
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
              returnKeyType="next"
              onSubmitEditing={() => verifyPasswordRef.current?.focus()}
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
          <FormControlHelper>
            <FormControlHelperText>
              Le mot de passe doit faire minimum 8 caractères et doit contenir
              au moins une majuscule et un chiffre
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>

        {/* Verify Password field */}
        <FormControl isInvalid={Boolean(verifyPasswordError)}>
          <Input variant="rounded" size="lg">
            <InputField
              ref={verifyPasswordRef}
              type={showVerifyPassword ? "text" : "password"}
              onChangeText={(text) => {
                onChangeVerifyPassword(text);
                if (verifyPasswordError) setVerifyPasswordError("");
              }}
              value={verifyPassword}
              placeholder="Confirmer mot de passe"
              placeholderTextColor="#999"
              secureTextEntry={!showVerifyPassword}
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={handleRegister}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowVerifyPassword(!showVerifyPassword)}
            >
              <InputIcon as={showVerifyPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{verifyPasswordError}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          disabled={isPending}
          onPress={handleRegister}
        >
          <ButtonText>
            {isPending ? "Création..." : "Créer un compte"}
          </ButtonText>
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    marginBottom: 16,
  },
});
