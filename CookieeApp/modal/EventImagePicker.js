import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EventImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri); // 선택한 이미지의 uri를 부모 컴포넌트로 전달
    }
  };

  return (
    <View style={styles.AddEventContainer}>
      <TouchableOpacity style={styles.addContainer} onPress={pickImage}>
        <View style={styles.addText}>
          <Text style={{ fontSize: 25 }}>+</Text>
        </View>
      </TouchableOpacity>
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
    height: 32,
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
