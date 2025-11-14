import { ThemedView } from "@/components/ThemedView";
import BackButon from "@/components/ui/BackButton";
import { ScrollView } from "react-native";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <ThemedView className={"flex-1 pl-5 pr-5 justify-center"}>
      <BackButon />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          height: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <ChangePasswordForm />
      </ScrollView>
    </ThemedView>
  );
}
