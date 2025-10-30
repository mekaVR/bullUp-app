import { SplashScreen } from "expo-router";
import { useSession } from "@/app/authentication/contexts/AuthContext";

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
