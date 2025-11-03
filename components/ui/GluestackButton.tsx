import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface GluestackButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function GluestackButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
}: GluestackButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];

    if (disabled) {
      return [...baseStyle, styles.buttonDisabled];
    }

    switch (variant) {
      case "secondary":
        return [...baseStyle, styles.buttonSecondary];
      case "outline":
        return [...baseStyle, styles.buttonOutline];
      default:
        return [...baseStyle, styles.buttonPrimary];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${size}`]];

    switch (variant) {
      case "outline":
        return [...baseStyle, styles.textOutline];
      default:
        return [...baseStyle, styles.textPrimary];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button_sm: {
    height: 36,
    paddingHorizontal: 16,
  },
  button_md: {
    height: 44,
    paddingHorizontal: 20,
  },
  button_lg: {
    height: 56,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: Colors.light.primary,
  },
  buttonSecondary: {
    backgroundColor: "#6B7280",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  buttonDisabled: {
    backgroundColor: "#D1D5DB",
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  textPrimary: {
    color: "#FFFFFF",
  },
  textOutline: {
    color: Colors.light.primary,
  },
});
