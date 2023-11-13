import { Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default ScreenTabs = () => {
  <Tabs styles={styles.container}>
    <Tabs.Screen
      name="/screen/CalenderHome"
      options={{ headerTitle: "screen/CalenderHome", headerShown: true }}
    />
    <Tabs.Screen
      name="/screen/Login"
      options={{ headerTitle: "screen/Login", headerShown: true }}
    />
  </Tabs>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#CCCCCC",
  },
});
