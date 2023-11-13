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

import ThumnailImagrPicker from "./ThumnailImagrPicker";
import AddEventForm from "./AddEventFform";

export default function DayBottomModal({
  isVisible,
  onClose,
  selectedDate,
  getSelectedImageUris,
}) {
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-1, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) =>
        panY.setValue(gestureState.dy),
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  const closeModal = () => {
    getSelectedImageUris(selectedImageUris);
    closeBottomSheet.start(() => {
      console.log("모달 닫힘");
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      console.log("모달 열림");
      resetBottomSheet.start();
    }
  }, [isVisible]);
  isVisible;

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
    setSelectedImageUris((selectedImageUris) => updatedImageUris);
    getSelectedImageUris(selectedImageUris);
  };

  return (
    <View style={styles.flexible}>
      <Modal
        visible={isVisible}
        animationType={"slide"}
        transparent={true}
        statusBarTranslucent={true}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <TouchableOpacity>
            <Animated.View
              style={{
                ...styles.bottomSheetContainer,
                transform: [{ translateY: translateY }],
              }}
              {...panResponder.panHandlers}
            >
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
            </Animated.View>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flexible: {
    // flex: 1,
    position: "absolute",
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
