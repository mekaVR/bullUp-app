import BackButon from "@/components/ui/BackButton";
import { ScrollView, StyleSheet } from "react-native";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ScreenLayout from "@/components/ScreenLayout";

export default function ChangePassword() {
  return (
    <ScreenLayout>
      <BackButon />
      <ScrollView
        className={"w-full"}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ChangePasswordForm />
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: "center",
    height: "100%",
  },
});
