import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const BottomModal = () => {
  return <Redirect href={"/date"} />;
};

export default BottomModal;
