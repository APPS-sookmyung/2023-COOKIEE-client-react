import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import EventImagePicker from "./EventImagePicker";
import { useCalendarDataActions } from "../DataProvider";
import { CalendarDataActionsContext } from "../DataProvider";

const { addEvent } = useCalendarDataActions;

export default function AddEventForm({ isOpenForm, onCloseForm }) {
  const [newEvent, setNewEvent] = useState({
    eId: null, // 자동 생성
    imgUrl: [],
    cate: "",
    time: "",
    place: "",
    detail: "",
    people: "",
  });

  const calendarDataActions = useCalendarDataActions(); // 전체 객체 가져오기

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
      eId: null,
      imgUrl: [],
      cate: "",
      time: "",
      place: "",
      detail: "",
      people: "",
    });

    console.log("새 이벤트 정보:", newEvent);
  };

  const [selectedImageUris, setSelectedImageUris] = useState({});

  const handleImageSelected = (imageUri) => {
    // const updatedImageUris = { ...selectedImageUris };
    // // updatedImageUris[selectedDate.date] = imageUri;
    // setSelectedImageUris((selectedImageUris) => updatedImageUris);
    // // getSelectedImageUris(selectedImageUris);
    const updatedImgUrl = [...newEvent.imgUrl];
    updatedImgUrl.push(imageUri);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      imgUrl: updatedImgUrl,
    }));
  };

  if (!isOpenForm) {
    return null;
  }

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
        onImageSelected={handleImageSelected}
        value={newEvent.imgUrl}
      />

      {/* <TouchableOpacity style={styles.inputBtn}>
        <Text>추가할 사진 선택</Text>
      </TouchableOpacity> */}
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
      <Button title="이벤트 추가하가" onPress={handleSubmit} />
    </View>
  );
}

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
