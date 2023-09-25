import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddNewEvent({ onPressed }) {
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
      onImagesSelected(result.assets[0].uri); // 선택한 이미지의 uri를 부모 컴포넌트로 전달
    }
  };

  return (
    <View style={styles.AddNewEventScreen}>
      <View
        style={{
          width: 50,
          backgroundColor: "lightgray",
          borderRadius: 5,
          padding: 7,
          alignSelf: "flex-end",
          margin: 20,
        }}
      >
        <TouchableOpacity>
          <Text style={{ width: "auto", fontSize: 18 }}>완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.EventImages}>
        <View
          style={{
            width: "auto",
            backgroundColor: "white",
            alignSelf: "center",
            fontSize: 20,
            borderRadius: 5,
            padding: 10,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                width: "auto",
                alignSelf: "center",
                fontSize: 20,
              }}
            >
              사진 수정하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 600,
            margin: 25,
          }}
        >
          사진 정보 작성
        </Text>
      </View>

      <View style={styles.EventInfoContainer}>
        <View style={styles.EventInfo}>
          <Text style={styles.EventInfoName}>카테고리</Text>
          <View style={styles.EventInfoInput}></View>
        </View>
        <View style={styles.EventInfo}>
          <Text style={styles.EventInfoName}>시간</Text>
          <View style={styles.EventInfoInput}></View>
        </View>
        <View style={styles.EventInfo}>
          <Text style={styles.EventInfoName}>장소</Text>
          <View style={styles.EventInfoInput}></View>
        </View>
        <View style={styles.EventInfo}>
          <Text style={styles.EventInfoName}>내용</Text>
          <View style={styles.EventInfoInput}></View>
        </View>
        <View style={styles.EventInfo}>
          <Text style={styles.EventInfoName}>함께한 사람</Text>
          <View style={styles.EventInfoInput}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddNewEventScreen: {
    marginTop: 70,
    flex: 1,
    display: "flex",
    // backgroundColor: "green",
  },

  EventImages: {
    width: 220,
    height: 350,
    backgroundColor: "lightgray",
    borderRadius: 5,
    display: "flex",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
  },
  EventInfoContainer: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
  },
  EventInfo: {
    display: "flex",
    flexDirection: "row",
    left: 25,
    alignContent: "center",
    margin: 10,
  },
  EventInfoInput: {
    backgroundColor: "lightgray",
    width: 230,
    height: 27,
    borderRadius: 5,
  },
  EventInfoName: {
    width: 110,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
  },
});
