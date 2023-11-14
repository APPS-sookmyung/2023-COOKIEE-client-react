import { Stack, Tabs } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default TabsLayout = () => {
  return (
    <Stack styles={styles.container}>
      <Stack.Screen
        name="home"
        options={{
          tabBarLabel: "Calendar Home",
          title: "Cookiee",
          headerShown: true,
          headerLeft: () => <Button title="< SideMenu" onPress={{}} />,
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
