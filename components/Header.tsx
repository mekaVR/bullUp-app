import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/AuthContext";

export default function Header() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user } = useSession();

  return (
    <ThemedView className={"h-40 p-5"}>
      <View className={"justify-between items-center flex-1 flex-row pt-20"}>
        <Text
          style={[
            styles.logo,
            { color: Colors[colorScheme ?? "light"].primary },
          ]}
        >
          BullUp
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.navigate("/profile");
          }}
        >
          <Avatar key={user?.avatar || user?.username}>
            <AvatarFallbackText>{user?.username}</AvatarFallbackText>
            {user?.avatar && (
              <AvatarImage
                source={{
                  uri: user?.avatar,
                }}
              />
            )}
          </Avatar>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: Typography.fonts.logo,
    fontSize: Typography.sizes["4xl"],
  },
});
