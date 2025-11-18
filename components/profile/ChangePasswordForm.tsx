import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import useChangePassword from "@/hooks/user/useChangePassword";
import { useState } from "react";
import { validatePassword } from "@/utils/authentication";
import { StyleSheet } from "react-native";

export default function ChangePasswordForm() {
  const { mutateAsync: changePassword } = useChangePassword();
  const [old_password, setOldPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
  const [new_password, setNewPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirm_password, setConfirmNewPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleSubmit = async () => {
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!old_password.trim()) {
      setOldPasswordError("L'ancien mot de passe est requis");
      hasError = true;
    }

    if (!new_password.trim()) {
      setNewPasswordError("Le nouveau mot de passe est requis");
      hasError = true;
    }

    if (!confirm_password.trim()) {
      setConfirmPasswordError("La confirmation est requise");
      hasError = true;
    }

    if (old_password.trim()) {
      const oldPasswordValidationError = validatePassword(old_password);
      if (oldPasswordValidationError) {
        setOldPasswordError(oldPasswordValidationError);
        hasError = true;
      }
    }

    if (new_password.trim()) {
      const newPasswordValidationError = validatePassword(new_password);
      if (newPasswordValidationError) {
        setNewPasswordError(newPasswordValidationError);
        hasError = true;
      }
    }

    if (new_password.trim() && confirm_password.trim()) {
      if (new_password !== confirm_password) {
        setConfirmPasswordError("Les mots de passe ne correspondent pas");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    await changePassword({
      old_password,
      new_password,
      confirm_password,
    });
  };

  return (
    <VStack space={"xl"}>
      <ThemedText type="title" style={styles.title}>
        Changer le mot de passe
      </ThemedText>
      <FormControl isInvalid={Boolean(oldPasswordError)}>
        <Input variant="rounded" size="xl">
          <InputField
            value={old_password}
            placeholder="Ancien mot de passe"
            secureTextEntry={!showOldPassword}
            returnKeyType="next"
            onChangeText={setOldPassword}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <InputIcon as={showOldPassword ? EyeOffIcon : EyeIcon} />
          </InputSlot>
        </Input>
        {oldPasswordError && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{oldPasswordError}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(newPasswordError)}>
        <Input variant="rounded" size="xl">
          <InputField
            value={new_password}
            placeholder="Nouveau mot de passe"
            secureTextEntry={!showNewPassword}
            returnKeyType="next"
            onChangeText={setNewPassword}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <InputIcon as={showNewPassword ? EyeOffIcon : EyeIcon} />
          </InputSlot>
        </Input>
        {newPasswordError && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{newPasswordError}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(confirmPasswordError)}>
        <Input variant="rounded" size="xl">
          <InputField
            value={confirm_password}
            placeholder="Confirmer le mot de passe"
            secureTextEntry={!showConfirmPassword}
            returnKeyType="done"
            onChangeText={setConfirmNewPassword}
          />
          <InputSlot
            className="pr-3"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <InputIcon as={showConfirmPassword ? EyeOffIcon : EyeIcon} />
          </InputSlot>
        </Input>
        {confirmPasswordError && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{confirmPasswordError}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
      <Button
        className="rounded-full"
        variant="solid"
        size="xl"
        action="primary"
        onPress={handleSubmit}
      >
        <ButtonText>{"Modifier"}</ButtonText>
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.light.primary,
    textAlign: "center",
  },
});
