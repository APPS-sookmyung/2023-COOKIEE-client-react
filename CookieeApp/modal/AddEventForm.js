import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCalendarDataActions } from "../DataProvider";

export default function AddEventForm({ isOpenForm, onCloseForm }) {
  const [newEvent, setNewEvent] = useState({
    eId: null, // 자동 생성
    imgUrl: [],
    cate: [],
    time: "",
    place: "",
    detail: "",
    people: "",
  });

  const calendarDataActions = useCalendarDataActions();

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
      cate: [],
      time: "",
      place: "",
      detail: "",
      people: "",
    });
  };

  if (!isOpenForm) {
    return null;
  }

  return (
    <View style={styles.AddEventForm}>
      <TouchableOpacity
        onPress={() => {
          onCloseForm();
        }}
      >
        <Text>닫기</Text>
      </TouchableOpacity>
      <Text>새 이벤트 추가</Text>
      <View>
        <Text>추가할 사진 선택</Text>
      </View>
      <View>
        <Text>추가할 카테고리 선택</Text>
      </View>
      <TextInput
        placeholder="시간"
        value={newEvent.time}
        onChangeText={(text) => handleInputChange(text, "time")}
      />
      <TextInput
        placeholder="장소"
        value={newEvent.place}
        onChangeText={(text) => handleInputChange(text, "place")}
      />
      <TextInput
        placeholder="내용"
        value={newEvent.detail}
        onChangeText={(text) => handleInputChange(text, "detail")}
      />
      <TextInput
        placeholder="사람"
        value={newEvent.people}
        onChangeText={(text) => handleInputChange(text, "people")}
      />
      {/* 다른 TextInput 컴포넌트들도 동일한 방식으로 처리합니다. */}
      <Button title="이벤트 추가" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  AddEventForm: {
    height: 300,
    backgroundColor: "lightgray",
  },
});
