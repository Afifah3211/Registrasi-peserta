import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8" // slate-400
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155", // slate-700
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc", // slate-50
    borderWidth: 1,
    borderColor: "#cbd5e1", // slate-300
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a", // slate-900
  },
  textArea: {
    minHeight: 100,
  },
});
