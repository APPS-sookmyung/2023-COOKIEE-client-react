import { Stack, Tabs } from "expo-router";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default TabsLayout = () => {
  return (
    <Stack styles={styles.container}>
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
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "red",
  },
});
