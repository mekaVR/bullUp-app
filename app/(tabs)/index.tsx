import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView className={"flex-1 pl-5 pr-5 justify-center"}>
      <ThemedView className={"flex-row items-center gap-8"}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
