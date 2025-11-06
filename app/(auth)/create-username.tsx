import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
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
    <ThemedView style={styles.container}>
      <BackButon />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Créez un pseudo
        </ThemedText>
      </ThemedView>

      {data?.exists || isError ? (
        <Alert action="error" variant="solid" style={{ marginBottom: 10 }}>
          <AlertIcon as={InfoIcon} />
          <AlertText>{data?.message || error?.response?.data.detail}</AlertText>
        </Alert>
      ) : null}

      <View style={styles.stepContainer}>
        <FormControl>
          <Input variant="rounded" size="lg">
            <InputField
              onChangeText={onChangeUsername}
              value={username?.toLowerCase().trim()}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#999"
              autoCapitalize="none"
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
      </View>
      <View style={styles.buttonContainer}>
        <Button
          className="rounded-full"
          variant="solid"
          size="lg"
          action="primary"
          isDisabled={username.trim().length < 2 || isPending}
          onPress={() => onCheckUsernameExist({ username })}
        >
          <ButtonText>{isPending ? "Vérification..." : "Continuer"}</ButtonText>
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
    marginBottom: 32,
  },
  title: {
    color: Colors.light.primary,
    fontSize: 32,
    fontWeight: "bold",
  },
  stepContainer: {
    marginBottom: 32,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
