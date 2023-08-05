import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CalendarHome from "./screens/CalenderHome";
import DayBottomModal from "./modal/DayBottomModal";

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarHome />
      <DayBottomModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
