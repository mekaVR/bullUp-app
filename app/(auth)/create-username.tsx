import { StyleSheet } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import BackButon from "@/components/ui/BackButton";
import { Colors } from "@/constants/Colors";
import useCheckUsernameExists from "@/hooks/authentication/useCheckUsernameExist";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";
import ScreenLayout from "@/components/ScreenLayout";
import { VStack } from "@/components/ui/vstack";

export default function CreateUsername() {
  const [username, onChangeUsername] = useState("");
  const {
    mutate: onCheckUsernameExist,
    isError,
    error,
    data,
    isPending,
  } = useCheckUsernameExists(username);

  return (
    <ScreenLayout>
      <BackButon />
      <VStack space="xl" className={"justify-center items-center w-full"}>
        <ThemedText type="title" style={styles.title}>
          Créez un pseudo
        </ThemedText>

        {data?.exists || isError ? (
          <Alert action="error" variant="solid" className={"w-full"}>
            <AlertIcon as={InfoIcon} />
            <AlertText>
              {data?.message || error?.response?.data.detail}
            </AlertText>
          </Alert>
        ) : null}

        <FormControl>
          <Input variant="rounded" size="lg" className={"w-full"}>
            <InputField
              onChangeText={onChangeUsername}
              value={username.trim()}
              placeholder="Nom d'utilisateur"
              returnKeyType="done"
              onSubmitEditing={() => onCheckUsernameExist({ username })}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Le pseudo doit comporter au moins 2 caractères
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>
        <Button
          className="rounded-full w-full"
          variant="solid"
          size="lg"
          action="primary"
          isDisabled={username.trim().length < 2 || isPending}
          onPress={() => onCheckUsernameExist({ username })}
        >
          <ButtonText>{isPending ? "Vérification..." : "Continuer"}</ButtonText>
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
