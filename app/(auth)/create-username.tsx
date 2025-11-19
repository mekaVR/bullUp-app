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
import { API_DEFAULT_ERROR_MESSAGE } from "@/constants/api";

export default function CreateUsername() {
  const [username, setUsername] = useState("");
  const {
    mutate: checkUsernameExist,
    isError: isCheckUsernameExistError,
    error: checkUsernameExistError,
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

        {data?.exists || isCheckUsernameExistError ? (
          <Alert action="error" variant="solid" className={"w-full"}>
            <AlertIcon as={InfoIcon} />
            <AlertText>
              {data?.message ??
                checkUsernameExistError?.response?.data.message ??
                API_DEFAULT_ERROR_MESSAGE}
            </AlertText>
          </Alert>
        ) : null}

        <FormControl>
          <Input variant="rounded" size="lg" className={"w-full"}>
            <InputField
              onChangeText={setUsername}
              value={username.trim()}
              placeholder="Nom d'utilisateur"
              returnKeyType="done"
              onSubmitEditing={() => checkUsernameExist({ username })}
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
          onPress={() => checkUsernameExist({ username })}
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
