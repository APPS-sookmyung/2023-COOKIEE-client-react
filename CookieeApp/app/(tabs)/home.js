import { View, Text, StyleSheet } from "react-native";
import Calendar from "../../components/Calender";

function CalendarHome() {
  return (
    <View style={S.calendarContainer}>
      <Calendar />
    </View>
  );
}

const S = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
});

export default CalendarHome;
