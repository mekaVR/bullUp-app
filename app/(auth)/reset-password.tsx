import { StyleSheet } from "react-native";
import { useState } from "react";
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
import { validateEmail } from "@/utils/authentication";
import useRequestPasswordReset from "@/hooks/authentication/useRequestPasswordReset";
import { useRouter } from "expo-router";
import ScreenLayout from "@/components/ScreenLayout";
import { VStack } from "@/components/ui/vstack";
import { Typography } from "@/constants/Typography";
import { ThemedView } from "@/components/ThemedView";

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
    <ScreenLayout>
      <BackButon />
      <VStack space={"xl"}>
        <ThemedText type="title" style={styles.title}>
          Mot de passe oublié
        </ThemedText>

        {isError ? (
          <Alert action="error" variant="solid">
            <AlertIcon as={InfoIcon} />
            <AlertText>{error?.response?.data?.email?.error}</AlertText>
          </Alert>
        ) : null}

        {isSuccess ? (
          <>
            <Alert action="success" variant="solid">
              <AlertIcon as={CheckCircleIcon} />
              <AlertText style={styles.successTitle}>Email envoyé !</AlertText>
            </Alert>

            <ThemedText style={styles.successText}>
              Email de récupération envoyé à{" "}
              <ThemedText style={styles.emailText}>{email}</ThemedText>
            </ThemedText>

            <ThemedText style={styles.spamNotice}>
              N&#39;oubliez pas de vérifier vos spams si vous ne trouvez pas
              l&#39;email.
            </ThemedText>
          </>
        ) : (
          <ThemedView>
            <ThemedText style={styles.descriptionText}>
              Entrez votre adresse email pour recevoir un lien de
              réinitialisation
            </ThemedText>

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
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{emailError}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          </ThemedView>
        )}

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
      </VStack>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.light.primary,
  },
  successText: {
    color: Colors.light.primary,
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: Typography.sizes.lg,
  },
  descriptionText: {
    textAlign: "center",
    color: Colors.light.primary,
    marginBottom: 15,
  },
  emailText: {
    fontWeight: "bold",
    color: Colors.light.primary,
  },
  spamNotice: {
    textAlign: "center",
    opacity: 0.7,
    fontStyle: "italic",
  },
});
