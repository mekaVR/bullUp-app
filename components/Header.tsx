import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Typography } from "@/constants/Typography";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import LogoBullUP from "@/components/LogoBullUp";

export default function Header() {
  const router = useRouter();
  const { user } = useSession();

  return (
    <ThemedView className={"h-40 p-5"}>
      <View className={"justify-between items-center flex-1 flex-row pt-20"}>
        <LogoBullUP size={Typography.sizes["4xl"]} />
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
