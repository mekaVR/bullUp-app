import BackButon from "@/components/ui/BackButton";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import ProfileForm from "@/components/profile/ProfileForm";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";

export default function Profile() {
  const { logOut } = useSession();
  const isKeyboardVisible = useKeyboardIsVisible();

  return (
    <ThemedView className={"flex-1 pl-5 pr-5 justify-center"}>
      <BackButon />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={"flex-grow-1 justify-center"}
      >
        <ScrollView
          scrollEnabled={isKeyboardVisible}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileForm />
        </ScrollView>
      </KeyboardAvoidingView>
      <Button
        className="rounded-full absolute w-full -bottom-safe-or-2 left-5"
        variant="solid"
        size="xl"
        action="secondary"
        onPress={logOut}
      >
        <ButtonText>{"Se déconnecter"}</ButtonText>
      </Button>
    </ThemedView>
  );
}
