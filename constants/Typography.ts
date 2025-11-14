/**
 * Typography Configuration
 * Centralized font configuration for the entire app.
 * To change the default font, modify the values here.
 */

export const Typography = {
  // Default font family for the app
  defaultFont: "Montserrat",

  // Font families
  fonts: {
    regular: "Montserrat",
    medium: "Montserrat-Medium",
    semiBold: "Montserrat-SemiBold",
    bold: "Montserrat-Bold",
    // Special fonts
    logo: "VaselineExtra",
    mono: "SpaceMono",
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
  },

  // Line heights
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
