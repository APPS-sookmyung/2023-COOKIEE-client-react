import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ThumnailImagrPicker from "../../utils/ThumnailImagrPicker";
import EventBox from "../../components/EventBox";

import CalendarHome from "../home";

const BottomModalContnet = () => {
  const router = useRouter();

  const { date } = useLocalSearchParams();

  const selectedDate = JSON.parse(date);
  console.log(selectedDate);

  const [selectedImageUris, setSelectedImageUris] = useState({});

  const handleImageSelected = (imageUri) => {
    const updatedImageUris = { ...selectedImageUris };
    updatedImageUris[selectedDate.date] = imageUri;
    setSelectedImageUris(updatedImageUris);
    console.log("selectedImageUris", selectedImageUris);
  };

  const [isOpenAddEventForm, setIsOpenAddEventForm] = useState(false);

  const openForm = () => {
    setIsOpenAddEventForm(true);
  };

  const closeForm = () => {
    setIsOpenAddEventForm(false);
  };

  return (
    <View style={styles.modalContainer}>
      <Stack.Screen options={{ headerShown: false, presentation: "modal" }} />
      <View>
        <View>
          <View style={styles.thumnailContainer}>
            <View>
              {selectedDate && selectedImageUris[selectedDate.date] && (
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: selectedImageUris[selectedDate.date] }}
                  resizeMode="cover"
                ></ImageBackground>
              )}
            </View>
            <View style={styles.addContainer}>
              <ThumnailImagrPicker onImageSelected={handleImageSelected} />
            </View>
            <View style={styles.modalDateContainer}>
              {selectedDate &&
                selectedDate.year &&
                selectedDate.month &&
                selectedDate.date && (
                  <Text style={styles.modalDate}>
                    {selectedDate.year}년 {selectedDate.month}월{" "}
                    {selectedDate.date}일
                  </Text>
                )}
            </View>
          </View>
          {/* 이벤트 리스트가 들어가는 위치 */}
          <TouchableOpacity
            style={{ margin: 10 }}
            // 밖에 이벤트 아이디 백엔드로 요청하는 함수 만들기
            // onPress={() => router.push("form")}
            onPress={() => router.push("event")}
          >
            <View style={{ width: "100%", height: "auto" }}>
              <EventBox />
            </View>
          </TouchableOpacity>

          <View style={styles.AddEventContainer}>
            <TouchableOpacity
              style={styles.AddEventBtnContainer}
              onPress={() => {
                router.push({
                  pathname: "form",
                  params: {
                    year: selectedDate.year,
                    month: selectedDate.month,
                    date: selectedDate.date,
                  },
                });
              }}
            >
              <View style={styles.addPlusBtn}>
                <Text style={{ fontSize: 25 }}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomModalContnet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  thumnailContainer: {
    display: "flex",
    height: 230,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  modalDate: {
    fontSize: 30,
    fontWeight: "600",
    color: "#594E4E",
  },
  modalDateContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: 10,
  },
  addContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
  },
  AddEventContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  AddEventBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: "10px",
    width: "90%",
    height: 32,
    margin: 1,
  },
  addPlusBtn: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
});
