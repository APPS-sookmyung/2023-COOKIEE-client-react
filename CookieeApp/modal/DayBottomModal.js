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
} from "react-native";

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
                {selectedDate &&
                  selectedDate.year &&
                  selectedDate.month &&
                  selectedDate.date && (
                    <Text style={styles.modalDate}>
                      {selectedDate.year}년 {selectedDate.month}월{" "}
                      {selectedDate.date}일
                    </Text>
                  )}
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
    flex: 1,
    position: "absolute",
    zIndex: 2,
  },
  alignContentsCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bottomSheetContainer: {
    height: 850,
    backgroundColor: "#fff",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  },
});
