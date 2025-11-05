import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  SessionProvider,
  useSession,
} from "@/app/authentication/contexts/AuthContext";
import { SplashScreenController } from "@/components/SplashScreenController";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <SessionProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <SplashScreenController />
            <RootNavigator />
            <StatusBar style="auto" />
          </ThemeProvider>
        </SessionProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="authentication/screens/welcome" />
        <Stack.Screen name="authentication/screens/login" />
        <Stack.Screen name="authentication/screens/register" />
        <Stack.Screen name="authentication/screens/createUsername" />
        <Stack.Screen name="authentication/screens/resetPassword" />
      </Stack.Protected>
    </Stack>
  );
}
