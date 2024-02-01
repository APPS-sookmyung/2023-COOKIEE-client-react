import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import EventBox from "../../components/EventBox";

import { createThumb } from "../../../api/thumbnail/createThumb";
import { getThumb } from "../../../api/thumbnail/getThumb";
import { getEventList } from "../../../api/event/getEventList";
import { updateThumb } from "../../../api/thumbnail/updateThumb";

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const BottomModalContnet = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(1);

  const { date } = useLocalSearchParams();

  const selectedDate = JSON.parse(date);

  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState();
  const [thumbnailId, setThumbnailId] = useState();
  const [hasThumb, setHasThumb] = useState(false);

  const [eventList, setEventList] = useState([]);

  const onImageSelected = (imageData) => {
    setSelectedThumbnailUrl(imageData.uri);

    if (hasThumb == false) {
      console.log("등록 api");
      createThumb(userId, selectedDate, imageData);
    } else {
      console.log("수정 api");
      console.log(userId, thumbnailId, imageData);

      updateThumb(userId, thumbnailId, imageData);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0]);
    }
  };

  const alertPickThumb = () =>
    Alert.alert(
      "표지 사진 설정하기",
      "",
      [
        {
          text: "사진 수정하기",
          onPress: () => {
            {
              pickImage();
            }
          },
        },
        { text: "사진 삭제하기", onPress: () => console.log("삭제") },
        { text: "취소", onPress: () => {} },
      ],
      { cancelable: false }
    );

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getThumb(userId);

        if (!completed && result != null) {
          const eventList = await getEventList(
            userId,
            selectedDate.year,
            selectedDate.month,
            selectedDate.date
          );
          const thumbnail = result.find(
            (thumb) =>
              thumb.eventYear === selectedDate.year &&
              thumb.eventMonth === selectedDate.month &&
              thumb.eventDate === selectedDate.date
          );

          if (thumbnail != null) {
            setSelectedThumbnailUrl(thumbnail.thumbnailUrl);
            setThumbnailId(thumbnail.thumbnailId);
            setHasThumb(true);
            console.log(thumbnail.thumbnailUrl);
          }
          if (eventList != null) {
            setEventList(eventList);
            console.log(await eventList);
            // console.log(await eventList[0].categories);
          }
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
              {selectedThumbnailUrl !== null && (
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: selectedThumbnailUrl }}
                  resizeMode="cover"
                ></ImageBackground>
              )}
            </View>
            <View style={styles.addContainer}>
              <View style={styles.addThumnailBtnContainer}>
                <TouchableOpacity onPress={alertPickThumb}>
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={45}
                    color="#594E4E"
                  />
                </TouchableOpacity>
              </View>
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
          <View>
            {eventList != null
              ? eventList.map((event, index) => {
                  return (
                    <View key={index} style={{ width: "100%", height: "auto" }}>
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: `event/${event.eventId}`,
                          })
                        }
                      >
                        <EventBox eventData={event} />
                      </TouchableOpacity>
                    </View>
                  );
                })
              : null}
          </View>

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
    marginTop: 15,
  },
  AddEventBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: "10px",
    width: "95%",
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
  addThumnailBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
