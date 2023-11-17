import { Stack, Tabs } from "expo-router";
import { Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          tabBarLabel: "Calendar Home",
          title: "Cookiee",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
