import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CalendarHome from "./screens/CalenderHome";
import AddNewEvent from "./screens/AddNewEvent";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CalendarHome /> */}
      <AddNewEvent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
