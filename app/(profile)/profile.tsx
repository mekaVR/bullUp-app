import BackButon from "@/components/ui/BackButton";
import { useSession } from "@/contexts/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import ProfileForm from "@/components/profile/ProfileForm";
import useKeyboardIsVisible from "@/hooks/useKeyboardIsVisible";
import ScreenLayout from "@/components/ScreenLayout";

export default function Profile() {
  const { logOut } = useSession();
  const isKeyboardVisible = useKeyboardIsVisible();

  return (
    <ScreenLayout>
      <BackButon />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={"flex-grow-1 justify-center w-full"}
      >
        <ScrollView
          scrollEnabled={isKeyboardVisible}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollView}
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
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
