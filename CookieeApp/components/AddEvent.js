import { StyleSheet, Text, View } from "react-native";

export default function AddEvent() {
  return (
    <View style={styles.AddEventContainer}>
      <View style={styles.addContainer}>
        <View style={styles.addText}>
          <Text style={{ fontSize: 25 }}>+</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddEventContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
  },
  addContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: "10px",
    width: "90%",
    height: "5%",
    margin: 10,
  },
  addText: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    // backgroundColor: "red",
  },
});
