import { Stack, Tabs } from "expo-router";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default TabsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          tabBarLabel: "Calendar Home",
          title: "Cookiee",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name="menu" size={40} color="#594E4E" />
            </TouchableOpacity>
          ),
          headerStyle: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            margin: 1,
          },
          headerTitleStyle: {
            position: "absolute",
            fontSize: 30,
            fontWeight: "bold",
            color: "#594E4E",
          },
        }}
      />
    </Stack>
  );
};
