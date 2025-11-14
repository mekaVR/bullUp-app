import { ThemedView } from "@/components/ThemedView";
import { VStack } from "@/components/ui/vstack";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import { ThemedText } from "@/components/ThemedText";
import { EyeIcon, EyeOffIcon, InfoIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import BackButon from "@/components/ui/BackButton";
import { useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import useDeleteAccount from "@/hooks/user/useDeleteAccount";

export default function DeleteAccount() {
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <ThemedView className={"flex-1 pl-5 pr-5 justify-center"}>
      <BackButon />
      <VStack space="xl">
        <Alert action="error">
          <AlertIcon as={InfoIcon} />
          <AlertText>
            La suppression de votre compte est définitive et irréversible
          </AlertText>
        </Alert>

        <VStack space="md">
          <ThemedText style={styles.text}>Vous perdrez :</ThemedText>
          <ThemedText style={styles.text}>
            Toutes vos données personnelles
          </ThemedText>
          <ThemedText style={styles.text}>Votre collection</ThemedText>
          <ThemedText style={styles.text}>Votre wishlist</ThemedText>
        </VStack>

        <Input variant="rounded" size="xl">
          <InputField
            value={password}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={setPassword}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
          </InputSlot>
        </Input>

        <Button
          className="rounded-full"
          size="xl"
          action="negative"
          isDisabled={Boolean(!password)}
          disabled={Boolean(!password)}
          onPress={() => deleteAccount({ password })}
        >
          <ButtonText>Supprimer définitivement mon compte</ButtonText>
        </Button>
      </VStack>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.light.primary,
    textAlign: "center",
  },
});
