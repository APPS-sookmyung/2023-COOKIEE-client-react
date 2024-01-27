import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { MaterialIcons } from "@expo/vector-icons";

export default function ThumnailImagrPicker({ onImageSelected }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0]); // 선택한 이미지의 데이터를 부모 컴포넌트로 전달
    }
  };

  return (
    <View style={styles.addThumnailBtnContainer}>
      <TouchableOpacity onPress={pickImage}>
        <MaterialIcons name="add-photo-alternate" size={45} color="#594E4E" />
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
});
