import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function EventImagePicker({ onImageSelected }) {
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
    <TouchableOpacity style={styles.inputBtn} onPress={pickImage}>
      <Text>추가할 사진 선택</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputBtn: {
    backgroundColor: "yellow",
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
});
