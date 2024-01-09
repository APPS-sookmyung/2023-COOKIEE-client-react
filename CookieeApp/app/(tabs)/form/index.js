import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import EventImagePicker from "../../utils/EventImagePicker";
import DropDownPicker from "react-native-dropdown-picker";
import getCate from "../../../api/category/getCate";

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Carousel from "react-native-reanimated-carousel";

import { createEvent } from "../../../api/event/createEvent";
import { Link, router, useRouter } from "expo-router";

import DateTimePickerModal from "react-native-modal-datetime-picker";

// 카테고리 불러와 드롭다운으로 구성하기, id를 value 로 사용할 것
// 카테고리 선택하면 id 값으로 반환하기
// EventImagePicker가 반환하는 assets의 uri 갖고와서
//    화면에 띄우기
//    submit 할 때 내보내기

const AddEventFormScreen = (selectedDate) => {
  const router = useRouter();

  const width = Dimensions.get("window").width;

  // 이미지 업로드 구현
  const [imageUrl, setImageUrl] = useState([]);

  const uploadImage = async () => {
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      // aspect: [1, 1],
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }

    // 이미지 업로드 결과 및 이미지 경로 업데이트

    // uri 추출
    const uploadedImageURIs = result.assets.map((asset) => asset.uri);

    setImageUrl(uploadedImageURIs);
    console.log(uploadedImageURIs);
  };
  // 이미지 업로드 구현 끝

  // const [data, setData] = useState([]);
  // const [userId, setUserId] = useState(1);

  // useEffect(() => {
  //   let completed = false; // 첫 번째 1회 실행을 위한 flag

  //   async function get() {
  //     try {
  //       const result = await getCate(userId);
  //       if (!completed) {
  //         if (result != null) {
  //           setData(result);
  //           console.log(result);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   get();
  //   return () => {
  //     completed = true;
  //   };
  // }, [userId]); // userId가 변경될 때 마다 실행

  const [startTime, setStartTime] = useState(new Date()); // 선택 시작 날짜
  const [endTime, setEndTime] = useState(new Date()); // 선택 종료 날짜

  const [startOrEnd, setStartOrEnd] = useState("start");
  const [visible, setVisible] = useState(false); // 모달 노출 여부

  const onPressStartTime = () => {
    // 시작 시간 클릭 시
    setStartOrEnd("start");
    setVisible(true); // 모달 open
  };

  const onPressEndTime = () => {
    // 종료 시간 클릭 시
    setStartOrEnd("end");
    setVisible(true); // 모달 open
  };

  const onConfirm = (selectedDate) => {
    // 날짜 또는 시간 선택 시
    if (startOrEnd == "start") {
      setStartTime(selectedDate);
    } else {
      setEndTime(selectedDate);
    }

    setVisible(false); // 모달 close

    handleInputChange(
      startTime.getHours() +
        ":" +
        startTime.getMinutes() +
        " - " +
        endTime.getHours() +
        ":" +
        endTime.getMinutes(),
      "time"
    );
    console.log("새 이벤트 정보:", newEvent);
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "여행", value: 1 },
    { label: "카페", value: 2 },
    { label: "죽사죽사", value: 3 },
  ]);

  const [newEvent, setNewEvent] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
    date: selectedDate.date,
    imgUrl: [],
    cate: "",
    time: "",
    place: "",
    what: "",
    people: "",
  });

  const handleInputChange = (value, name) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // 입력 필드 초기화
    setNewEvent({
      year: selectedDate.year,
      month: selectedDate.month,
      date: selectedDate.date,
      imgUrl: [],
      cate: "",
      time: "",
      place: "",
      what: "",
      people: "",
    });

    router.back();

    // 서버로 post 전송

    // createEvent(
    //   userId,
    //   newEvent.what,
    //   newEvent.place,
    //   newEvent.people,
    //   newEvent.year,
    //   newEvent.month,
    //   newEvent.date,
    //   null,
    //   null,
    //   newEvent.cate
    // );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.formHeader}>
        <TouchableOpacity
          style={styles.headerBtn}
          title="이벤트 추가하가"
          onPress={handleSubmit}
        >
          <Text style={styles.headerBtnText}>완료</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          // flex: 0.7,
          alignSelf: "center",
          justifyContent: "center",
          width: "100%",
          height: "50%",
          // margin: 10,
          // backgroundColor: "lightgray",
          position: "relative",
        }}
      >
        {imageUrl.length === 0 ? (
          // 이미지가 업로드되지 않았을 때
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "lightgray",
            }}
          >
            <TouchableOpacity
              onPress={uploadImage}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EBEBEB",
                width: "70%",
                height: "70%",
                borderRadius: 10,
              }}
            >
              <Text>No Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // 이미지가 업로드된 후
          <Carousel
            loop
            mode="parallax"
            width={width}
            autoPlay={false}
            data={imageUrl}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: width,
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: 7,
                  }}
                />
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.formTitleContainer}>
        <Text style={styles.formTitleText}>🍪 사진 정보 작성</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>시작 시간</Text>
          <TouchableOpacity onPress={onPressStartTime} style={styles.InputBox}>
            <Text style={styles.buttonText}>
              {"  "}
              {startTime != null
                ? startTime.getHours() + " : " + startTime.getMinutes()
                : "시간"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={visible}
            mode={"time"}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={startTime}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>종료 시간</Text>
          <TouchableOpacity onPress={onPressEndTime} style={styles.InputBox}>
            <Text style={styles.buttonText}>
              {"  "}
              {endTime != null
                ? endTime.getHours() + " : " + endTime.getMinutes()
                : "시간"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={visible}
            mode={"time"}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={endTime}
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
            value={newEvent.what}
            onChangeText={(text) => handleInputChange(text, "what")}
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
        <View style={styles.InputContainer}>
          <Text style={styles.InputTitle}>카테고리</Text>
          <View style={styles.DropdownContainer}>
            <DropDownPicker
              style={{
                backgroundColor: "blue",
                borderRadius: 5,
                width: "100%",
                backgroundColor: "#EBEBEB",
                minHeight: 25,
                borderWidth: 0.5,
              }}
              listItemContainerStyle={styles.dropdown}
              multiple={true}
              min={0}
              max={5}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              stickyHeader={true}
              listMode="FLATLIST"
              placeholder="카테고리 선택"
              onChangeValue={(value) => {
                handleInputChange(value, "cate");
                console.log(value);
              }}
              textStyle={{
                fontSize: 13,
                margin: 0,
                padding: 0,
              }}
              containerStyle={{
                height: 0,
                margin: 0,
                padding: 0,
                borderRadius: 0,
                minHeight: 6,
              }}
              dropDownContainerStyle={{
                height: "auto",
                margin: 0,
                padding: 0,
                borderRadius: 0,
                backgroundColor: "green",
              }}
              placeholderStyle={{ color: "#bdbbbb", marginLeft: 0 }}
            />
          </View>
        </View>
      </View>
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
  formTitleText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 13,
    marginRight: 10,
    marginBottom: 10,
  },
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
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    justifyContent: "center",
  },
  inputBtn: {
    backgroundColor: "white",
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  headerBtn: {
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    marginRight: 20,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  headerBtnText: {
    fontSize: 15,
    fontWeight: "400",
  },
  DropdownContainer: {
    width: "70%",
    height: 25,
    zIndex: 100000,
  },
  dropdown: {
    backgroundColor: "#fafafa",
  },
  //이미지 추가 버튼
  imageInputBtn: {
    display: "flex",
    alignSelf: "center",
    width: "auto",
    height: 40,
    position: "relative",
  },
  buttonText: {
    color: "black",
    marginLeft: 0,
  },
});
