import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CalendarHome from "./screens/CalenderHome";

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
