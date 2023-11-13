import { View, Text, StyleSheet } from "react-native";
import Calendar from "../components/Calender";
import CalendarDataProvider from "../../DataProvider";

function CalendarHome() {
  return (
    <CalendarDataProvider>
      <View style={S.calendarContainer}>
        <Calendar />
      </View>
    </CalendarDataProvider>
  );
}

const S = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
});

export default CalendarHome;
