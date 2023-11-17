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
    <View style={styles.AddEventForm}>
      <TouchableOpacity
        style={styles.clodeBtn}
        onPress={() => {
          onCloseForm();
        }}
      >
        <Text style={{ alignSelf: "center", color: "red" }}>닫기</Text>
      </TouchableOpacity>

      <EventImagePicker
        // onImageSelected={handleImageSelected}
        value={newEvent.imgUrl}
      />

      <TouchableOpacity style={styles.inputBtn}>
        <Text>추가할 카테고리 선택</Text>
        <TextInput
          style={styles.InputBox}
          placeholder="카테고리"
          value={newEvent.cate}
          onChangeText={(text) => handleInputChange(text, "cate")}
        />
      </TouchableOpacity>
      <View style={styles.InputContainer}>
        <Text>시간</Text>
        <TextInput
          style={styles.InputBox}
          placeholder="시간"
          value={newEvent.time}
          onChangeText={(text) => handleInputChange(text, "time")}
        />
      </View>
      <View style={styles.InputContainer}>
        <Text>장소</Text>
        <TextInput
          style={styles.InputBox}
          placeholder="장소"
          value={newEvent.place}
          onChangeText={(text) => handleInputChange(text, "place")}
        />
      </View>
      <View style={styles.InputContainer}>
        <Text>내용</Text>
        <TextInput
          style={styles.InputBox}
          placeholder="내용"
          value={newEvent.detail}
          onChangeText={(text) => handleInputChange(text, "detail")}
        />
      </View>
      <View style={styles.InputContainer}>
        <Text>사람</Text>
        <TextInput
          style={styles.InputBox}
          placeholder="사람"
          value={newEvent.people}
          onChangeText={(text) => handleInputChange(text, "people")}
        />
      </View>

      {/* 다른 TextInput 컴포넌트들도 동일한 방식으로 처리합니다. */}
      <TouchableOpacity title="이벤트 추가하가" onPress={handleSubmit} />
    </View>
  );
};

export default AddEventFormScreen;

const styles = StyleSheet.create({
  AddEventForm: {
    height: 500,
    backgroundColor: "lightgray",
  },
  InputContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 3,
  },
  InputBox: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 100,
    marginLeft: 10,
  },
  inputBtn: {
    backgroundColor: "white",
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
  clodeBtn: {
    backgroundColor: "white",
    width: 30,
    borderRadius: 5,
    margin: 5,
    color: "red",
  },
});
