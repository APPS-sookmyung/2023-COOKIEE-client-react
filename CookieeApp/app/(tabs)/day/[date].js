import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import ThumnailImagrPicker from "../../utils/ThumnailImagrPicker";
import EventBox from "../../components/EventBox";

import CalendarHome from "../home";
import { createThumb } from "../../../api/thumbnail/createThumb";
import { getThumb } from "../../../api/thumbnail/getThumb";

const BottomModalContnet = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(1);

  const { date } = useLocalSearchParams();

  const selectedDate = JSON.parse(date);

  const [selectedThumbnail, setSelectedThumbnail] = useState();

  const handleImageSelected = (imageData) => {
    setSelectedThumbnail(imageData.uri);

    createThumb(userId, selectedDate, imageData);
  };

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getThumb(userId);

        if (!completed && result != null) {
          const thumbnail = result.find(
            (thumb) =>
              thumb.eventYear === selectedDate.year &&
              thumb.eventMonth === selectedDate.month &&
              thumb.eventDate === selectedDate.date
          );

          setSelectedThumbnail(thumbnail.thumbnailUrl);
        } else {
          console.error("getThumb returned undefined or null result");
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

  return (
    <View style={styles.modalContainer}>
      <Stack.Screen options={{ headerShown: false, presentation: "modal" }} />
      <View>
        <View>
          <View style={styles.thumnailContainer}>
            <View>
              {selectedThumbnail !== null && (
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: selectedThumbnail }}
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
