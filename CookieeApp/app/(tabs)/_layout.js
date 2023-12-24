import { Stack, Tabs } from "expo-router";
import { Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default HomeLayout = () => {
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
      <Stack.Screen
        name="day"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="sidebar"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryFix"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categoryAdd"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="collectCookiee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myPage"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
