import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";

const EventImagePicker = () => {
  // 현재 이미지 주소
  const [imageUrl, setImageUrl] = useState("");
  // 권한 요청을 위한 hooks
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    // if (!status?.granted) {
    //   const permission = await requestPermission();
    //   if (!permission.granted) {
    //     return null;
    //   }
    // }

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

    // 서버에 요청 보내기
    // const localUri = result.assets + "";
    // const filename = localUri.split("/").pop();
    // const match = /\.(\w+)$/.exec(filename ?? "");
    // const type = match ? `image/${match[1]}` : `image`;
    // const formData = new FormData();
    // formData.append("image", { uri: localUri, name: filename, type });

    // try {
    //   await axios({
    //     method: "post",
    //     url: "{API주소}",
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //     data: formData,
    //   });
    // } catch (err) {
    //   console.log("err", err);
    // }
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
