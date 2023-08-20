import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
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

import ImagePickerExample from "./ImagrPicker";

export default function DayBottomModal({ isVisible, onClose, selectedDate }) {
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
    closeBottomSheet.start(() => onClose());
  };

  useEffect(() => {
    if (isVisible) {
      resetBottomSheet.start();
    }
  }, [isVisible]);
  isVisible;

  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const handleImageSelected = (imageUri) => {
    setSelectedImageUri(imageUri);
  };

  return (
    <View style={styles.flexible}>
      <Modal
        visible={isVisible}
        animationType={"slide"}
        transparent={true}
        statusBarTranslucent={true}
      >
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <TouchableOpacity>
            <Animated.View
              style={{
                ...styles.bottomSheetContainer,
                transform: [{ translateY: translateY }],
              }}
              {...panResponder.panHandlers}
            >
              <View>
                <View style={styles.thumnailContainer}>
                  <View style={styles.addContainer}>
                    <ImagePickerExample onImageSelected={handleImageSelected} />
                  </View>
                  {selectedImageUri && (
                    <ImageBackground
                      style={{ width: "100%", height: "100%" }}
                      source={{ uri: selectedImageUri }}
                      resizeMode="cover"
                    ></ImageBackground>
                  )}
                  {selectedDate &&
                    selectedDate.year &&
                    selectedDate.month &&
                    selectedDate.date && (
                      <View style={styles.modalDateContainer}>
                        <Text style={styles.modalDate}>
                          {selectedDate.year}년 {selectedDate.month}월{" "}
                          {selectedDate.date}일
                        </Text>
                      </View>
                    )}
                </View>
                <Text>내용</Text>
              </View>
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
    backgroundColor: "red",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  modalDate: {
    fontSize: 30,
  },
  modalDateContainer: {
    position: "absolute",
    backgroundColor: "green",
    left: 0,
    bottom: 0,
  },
  addContainer: {
    zIndex: 2,
  },
});
