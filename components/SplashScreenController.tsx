import { SplashScreen } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import LogoBullUP from "@/components/LogoBullUp";
import { ThemedView } from "@/components/ThemedView";

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  if (isLoading) {
    return (
      <ThemedView className={"flex-1 items-center justify-center"}>
        <LogoBullUP size={120} />
      </ThemedView>
    );
  }

  return null;
}
