import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import {
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "@/components/ui/icon";
import { validateEmail } from "../utils";
import useRequestPasswordReset from "@/app/authentication/hooks/useRequestPasswordReset";
import { useRouter } from "expo-router";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const {
    mutateAsync: requestPasswordReset,
    isError,
    error,
    isPending,
    isSuccess,
  } = useRequestPasswordReset();

  const handleSubmit = async () => {
    if (isSuccess) {
      router.back();
      return;
    }

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    await requestPasswordReset({ email });
  };

  return (
    <ThemedView style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Mot de passe oublié
        </ThemedText>
      </ThemedView>

      {isError ? (
        <Alert action="error" variant="solid" style={{ marginBottom: 10 }}>
          <AlertIcon as={InfoIcon} />
          <AlertText>{error?.response?.data?.detail}</AlertText>
        </Alert>
      ) : null}

      {isSuccess ? (
        <View style={styles.successContainer}>
          <Alert action="success" variant="solid" style={{ marginBottom: 20 }}>
            <AlertIcon as={CheckCircleIcon} />
            <AlertText style={styles.successTitle}>Email envoyé !</AlertText>
          </Alert>

          <ThemedText style={styles.successMessage}>
            Email de récupération envoyé à{" "}
            <ThemedText style={styles.emailText}>{email}</ThemedText>
          </ThemedText>

          <ThemedText style={styles.spamNotice}>
            N&#39;oubliez pas de vérifier vos spams si vous ne trouvez pas
            l&#39;email.
          </ThemedText>
        </View>
      ) : (
        <View style={styles.stepContainer}>
          <ThemedText style={styles.description}>
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </ThemedText>

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
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{emailError}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          disabled={isPending}
          onPress={handleSubmit}
        >
          <ButtonText>
            {isPending ? "Envoi..." : isSuccess ? "Retour" : "Envoyer le lien"}
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
  description: {
    color: Colors.light.primary,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 8,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  successContainer: {
    marginBottom: 32,
    gap: 16,
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  successMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  emailText: {
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  spamNotice: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    fontStyle: "italic",
    marginTop: 8,
  },
});
