import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Typography } from "@/constants/Typography";

interface LogoBullUpProps {
  size: number;
}

export default function LogoBullUP({ size }: LogoBullUpProps) {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={{
        color: Colors[colorScheme ?? "light"].primary,
        fontFamily: Typography.fonts.logo,
        fontSize: size,
      }}
    >
      BullUp
    </Text>
  );
}
