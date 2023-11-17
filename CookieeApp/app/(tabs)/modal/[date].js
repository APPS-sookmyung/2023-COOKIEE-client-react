import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";

import ThumnailImagrPicker from "../../(modal)/ThumnailImagrPicker";

const BottomModalContnet = () => {
  const { date } = useGlobalSearchParams();

  const selectedDate = JSON.parse(date);

  const [selectedImageUris, setSelectedImageUris] = useState({});

  const handleImageSelected = (imageUri) => {
    const updatedImageUris = { ...selectedImageUris };
    updatedImageUris[selectedDate.date] = imageUri;
    setSelectedImageUris(updatedImageUris);
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
      <Stack.Screen options={{ headerShown: false }} />
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
          <View style={styles.AddEventContainer}>
            <TouchableOpacity
              style={styles.AddEventBtnContainer}
              onPress={openForm}
            >
              <View style={styles.addPlusBtn}>
                <Text style={{ fontSize: 25 }}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          {isOpenAddEventForm && (
            <AddEventForm
              selectedDate={selectedDate}
              isOpenForm={isOpenAddEventForm}
              onCloseForm={closeForm}
            />
          )}
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
    margin: 10,
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
