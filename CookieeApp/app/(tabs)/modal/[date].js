import { View, Text } from "react-native";
import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Header } from "react-native/Libraries/NewAppScreen";

const BottomModalContnet = () => {
  const { date } = useGlobalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `date: ${date}` }} />
      <Text>BottomModal: {date}</Text>
    </View>
  );
};

export default BottomModalContnet;
