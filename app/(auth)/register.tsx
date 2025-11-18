import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
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
import ScreenLayout from "@/components/ScreenLayout";
import { VStack } from "@/components/ui/vstack";

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
    <ScreenLayout>
      <BackButon />
      <VStack space={"xl"}>
        <ThemedText type="title" style={styles.title}>
          Inscription
        </ThemedText>

        {isError ? (
          <Alert action="error" variant="solid">
            <AlertIcon as={InfoIcon} />
            <AlertText>{registerError.response?.data.detail}</AlertText>
          </Alert>
        ) : null}

        {/* Email field */}
        <FormControl isInvalid={Boolean(emailError)}>
          <Input variant="rounded" size="lg">
            <InputField
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
              }}
              value={email.trim()}
              keyboardType="email-address"
              placeholder="Email"
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
              onChangeText={(text) => {
                onChangePassword(text);
                if (passwordError) setPasswordError("");
              }}
              value={password.trim()}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              returnKeyType="next"
              onSubmitEditing={() => verifyPasswordRef.current?.focus()}
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
              onChangeText={(text) => {
                onChangeVerifyPassword(text);
                if (verifyPasswordError) setVerifyPasswordError("");
              }}
              value={verifyPassword.trim()}
              placeholder="Confirmer mot de passe"
              secureTextEntry={!showVerifyPassword}
              returnKeyType="send"
              onSubmitEditing={handleRegister}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowVerifyPassword(!showVerifyPassword)}
            >
              <InputIcon as={showVerifyPassword ? EyeOffIcon : EyeIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{verifyPasswordError}</FormControlErrorText>
          </FormControlError>
        </FormControl>

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
      </VStack>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.light.primary,
    textAlign: "center",
  },
});
