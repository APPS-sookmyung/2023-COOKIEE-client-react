import { StyleSheet, Text, View } from "react-native";

import ImagePickerExample from "./ImagrPicker";

export default function AddEventInfo() {
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
  AddEventContainer: {},
});
