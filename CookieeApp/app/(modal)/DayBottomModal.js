import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";

import { router } from "expo-router";

import ThumnailImagrPicker from "./ThumnailImagrPicker";
import AddEventForm from "./AddEventForm";

export default function DayBottomModal({ selectedDate }) {
  const closeModal = () => {
    getSelectedImageUris(updatedImageUris);
    closeBottomSheet.start(() => {
      console.log("모달 닫힘");
      onClose();
    });
  };

  const [isOpenAddEventForm, setIsOpenAddEventForm] = useState(false);

  const openForm = () => {
    setIsOpenAddEventForm(true);
  };

  const closeForm = () => {
    setIsOpenAddEventForm(false);
  };

  const [selectedImageUris, setSelectedImageUris] = useState({});

  const handleImageSelected = (imageUri) => {
    const updatedImageUris = { ...selectedImageUris };
    updatedImageUris[selectedDate.date] = imageUri;
    setSelectedImageUris(updatedImageUris);
    getSelectedImageUris(updatedImageUris);
  };

  return (
    <View style={styles.flexible}>
      <Pressable style={styles.modalOverlay} onPress={closeModal}>
        <TouchableOpacity>
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
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flexible: {
    // flex: 1,
    // position: "absolute",
    zIndex: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bottomSheetContainer: {
    height: 850,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    // backgroundColor: "green",
    left: 0,
    bottom: 0,
    padding: 10,
  },
  addContainer: {
    // backgroundColor: "aqua",
    // zIndex: 2,
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
    // backgroundColor: "green",
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
    // backgroundColor: "red",
  },
});
