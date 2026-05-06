import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
}) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return "#2563eb"; // blue-600
      case "danger":
        return "#ef4444"; // red-500
      case "warning":
        return "#f59e0b"; // amber-500
      case "outline":
        return "transparent";
      default:
        return "#2563eb";
    }
  };

  const getTextColor = () => {
    if (variant === "outline") return "#334155"; // slate-700
    return "#ffffff";
  };

  const getBorderColor = () => {
    if (variant === "outline") return "#cbd5e1"; // slate-300
    return "transparent";
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
