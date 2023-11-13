import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ThumnailImagrPicker({ onImageSelected }) {
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
    <View style={styles.addThumnailBtnContainer}>
      <TouchableOpacity style={styles.addThumnailBtn} onPress={pickImage}>
        <Text style={styles.addThumnailBtnText}>대표사진 수정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addThumnailBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addThumnailBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 190,
    height: 40,
    backgroundColor: "#F6F1E4",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#594E4E",
  },
  addThumnailBtnText: {
    color: "#594E4E",
    fontSize: 20,
  },
});
