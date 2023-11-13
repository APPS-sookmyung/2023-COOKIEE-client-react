import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { useRoute, Link } from "@react-navigation/native";

const StackLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "index",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="(modal)/DayBottomModal"
        options={{
          headerTitle: "modal",
          presentation: "modal",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default StackLayout;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#AAAAAA",
  },
});
