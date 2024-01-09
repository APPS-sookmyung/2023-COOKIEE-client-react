import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { MaterialIcons } from "@expo/vector-icons";

const EventImagePicker = () => {
  // 현재 이미지 주소
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }

    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImageUrl(result.assets);
  };

  return (
    <TouchableOpacity style={styles.inputBtn} onPress={uploadImage}>
      <MaterialIcons name="add-photo-alternate" size={26} color="red" />
    </TouchableOpacity>
  );
};

export default EventImagePicker;

const styles = StyleSheet.create({
  inputBtn: {
    display: "flex",
    alignSelf: "center",
    width: "auto",
    height: "auto",
  },
});
