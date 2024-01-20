import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  SectionList,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useGlobalSearchParams, useRouter } from "expo-router";

import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import getCate from "../../../api/category/getCate";
import { createEvent } from "../../../api/event/createEvent";

import axios from "axios";

const AddEventFormScreen = () => {
  const router = useRouter();
  const { year, month, date } = useGlobalSearchParams();

  selectedDate = { year: year, month: month, date: date };

  const width = Dimensions.get("window").width;

  // 이미지 업로드 구현
  const [imageUrl, setImageUrl] = useState([]);

  const uploadImage = async () => {
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }

    // uri 추출
    const uploadedImageURIs = result.assets.map((asset) => asset.uri);

    setImageUrl(uploadedImageURIs);
  };

  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getCate(userId);
        if (!completed) {
          if (result != null) {
            let cateNum = 0;
            let presentCates = []; // Initialize an array to accumulate objects

            for (cateNum = 0; cateNum < result.length; cateNum++) {
              const presentCate = {
                label: result[cateNum].categoryName,
                value: result[cateNum].categoryId,
              };
              console.log(presentCate);

              presentCates.push(presentCate); // Add the object to the array
            }

            setItems([...presentCates, ...items]); // Spread the accumulated array
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    get(); // Call the function immediately

    return () => {
      completed = true;
    };
  }, [userId]);

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

  const onConfirm = (selected) => {
    // 날짜 또는 시간 선택 시
    if (startOrEnd == "start") {
      setStartTime(selected);
    } else {
      setEndTime(selected);
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
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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

  var formData = new FormData();

  var eventWhat = "모같코를 했당";
  var eventWhere = "신당역에성";
  var withWho = "쿠키팀이랑";
  var eventYear = 2023;
  var eventMonth = 12;
  var eventDate = 24;
  var images = [
    require("../../../assets/testImage/데사눈송이.png"),
    require("../../../assets/testImage/컴과눈송이.png"),
  ];
  var thumbnail = require("../../../assets/testImage/데사눈송이.png");
  var categories = "1, 2";

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

    //form-data append
    const userId = 1; // 예시로 1로 설정, 실제 사용자 ID를 적절하게 설정하세요
    const eventWhat = "이벤트 제목";
    const eventPlace = "이벤트 장소";
    const eventPeople = "참석자 목록";
    const eventYear = 2024;
    const eventMonth = 1;
    const eventDate = 16;

    // 이미지 파일들을 담을 FormData 객체 생성
    const formData = new FormData();

    // 필수 데이터 추가
    formData.append("userId", userId);
    formData.append("images", require("../../../assets/testImage/test.jpeg")); // file1, file2는 File 또는 Blob 객체여야 함

    // 기타 필요한 데이터 추가
    formData.append("eventWhat", eventWhat);
    formData.append("eventPlace", eventPlace);
    formData.append("eventPeople", eventPeople);
    formData.append("eventYear", eventYear);
    formData.append("eventMonth", eventMonth);
    formData.append("eventDate", eventDate);

    // 이미지 파일이 여러 개인 경우 추가로 append
    // formData.append('images', file2);

    // 나머지 필요한 데이터 추가...

    // 서버에 POST 요청 보내기
    axios
      .post(`http://localhost:8080/event/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error("에러 내용:", error));

    // 서버로 post 전송

    createEvent(
      userId,
      newEvent.what,
      newEvent.place,
      newEvent.people,
      Number(newEvent.year),
      Number(newEvent.month),
      Number(newEvent.date),
      imageUrl,
      imageUrl[0],
      JSON.stringify(newEvent.cate)
    );

    console.log(
      `userId : ${userId} //`,
      `what : ${newEvent.what} //`,
      `place : ${newEvent.place} //`,
      `people : ${newEvent.people} //`,
      `year : ${Number(newEvent.year)} //`,
      `month : ${Number(newEvent.month)} //`,
      `date : ${Number(newEvent.date)} //`,
      `imageUrl : ${imageUrl} //`,
      `Thumb : ${imageUrl[0]} //`,
      `cate : ${JSON.stringify(newEvent.cate)}`
    );

    console.log(
      `userId : ${typeof userId} //`,
      `what : ${typeof newEvent.what} //`,
      `place : ${typeof newEvent.place} //`,
      `people : ${typeof newEvent.people} //`,
      `year : ${typeof Number(newEvent.year)} //`,
      `month : ${typeof Number(newEvent.month)} //`,
      `date : ${typeof Number(newEvent.date)} //`,
      `imageUrl : ${typeof imageUrl} //`,
      `Thumb : ${typeof imageUrl[0]} //`,
      `cate : ${typeof JSON.stringify(newEvent.cate)}`
    );
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
            // onSnapToItem={(index) => console.log("current index:", index)}
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
                // console.log(value);
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
