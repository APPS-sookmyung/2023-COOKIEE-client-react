import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import EventImagePicker from "../../(modal)/EventImagePicker";

const AddEventFormScreen = (selectedDate) => {
  const [newEvent, setNewEvent] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
    date: selectedDate.date,
    imgUrl: [],
    cate: "",
    time: "",
    place: "",
    detail: "",
    people: "",
  });

  const handleInputChange = (value, name) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // 새 이벤트 추가
    calendarDataActions.addEvent(newEvent);

    // 입력 필드 초기화
    setNewEvent({
      year: selectedDate.year,
      month: selectedDate.month,
      date: selectedDate.date,
      imgUrl: [],
      cate: "",
      time: "",
      place: "",
      detail: "",
      people: "",
    });

    // console.log("새 이벤트 정보:", newEvent);
  };

  const [selectedImageUris, setSelectedImageUris] = useState({});

  const handleImageSelected = (imageUri) => {
    const updatedImgUrl = [...newEvent.imgUrl];
    updatedImgUrl.push(imageUri);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      imgUrl: updatedImgUrl,
    }));
  };

  return (
    <View style={styles.Container}>
      {/* 임시: 사진이 들어갈 자리 */}
      <View
        style={{
          flex: 0.7,
          alignSelf: "center",
          width: "50%",
          margin: 30,
          backgroundColor: "lightgray",
        }}
      />
      {/* 임시:  사진이 들어갈 자리 */}

      <View style={styles.formTitleContainer}>
        <Text style={styles.formTitleText}>🍪 사진 정보 작성</Text>
        <EventImagePicker
          // onImageSelected={handleImageSelected}
          value={newEvent.imgUrl}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>카테고리</Text>
          <TextInput
            style={styles.InputBox}
            placeholder="  카테고리"
            value={newEvent.cate}
            onChangeText={(text) => handleInputChange(text, "cate")}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>시간</Text>
          <TextInput
            style={styles.InputBox}
            placeholder="  시간"
            value={newEvent.time}
            onChangeText={(text) => handleInputChange(text, "time")}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>장소</Text>
          <TextInput
            style={styles.InputBox}
            placeholder="  장소"
            value={newEvent.place}
            onChangeText={(text) => handleInputChange(text, "place")}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>내용</Text>
          <TextInput
            style={styles.InputBox}
            placeholder="  내용"
            value={newEvent.detail}
            onChangeText={(text) => handleInputChange(text, "detail")}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>함께한 사람</Text>
          <TextInput
            style={styles.InputBox}
            placeholder="  사람"
            value={newEvent.people}
            onChangeText={(text) => handleInputChange(text, "people")}
          />
        </View>
      </View>

      <TouchableOpacity title="이벤트 추가하가" onPress={handleSubmit} />
    </View>
  );
};

export default AddEventFormScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  formContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  formTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  formTitleText: { fontSize: 20, fontWeight: "600", margin: 13 },
  InputContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginVertical: 9,
    marginHorizontal: 24,
    width: "auto",
    height: "auto",
  },
  InputTitle: {
    width: "auto",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  InputBox: {
    borderRadius: 5,
    width: "70%",
    height: 25,
    margin: "auto",
    backgroundColor: "#EBEBEB",
  },
  inputBtn: {
    backgroundColor: "white",
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
});
