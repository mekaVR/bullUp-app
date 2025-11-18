import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ScreenLayout from "@/components/ScreenLayout";

export default function HomeScreen() {
  return (
    <ScreenLayout>
      <ThemedView className={"flex-row items-center gap-8"}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
    </ScreenLayout>
  );
}
