import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const sideBarIndex = () => {
  return (
    <SafeAreaView style={S.container}>
      <TouchableOpacity onPress={() => router.push("categoryFix")}>
        <Text style={S.textStyle}>카테고리 수정</Text>
      </TouchableOpacity>
      <View style={S.line}></View>
      <TouchableOpacity onPress={() => router.push("collectCookiee")}>
        <Text style={S.textStyle}>쿠키 모아보기</Text>
      </TouchableOpacity>
      <View style={S.line}></View>
      <TouchableOpacity onPress={() => router.push("myPage")}>
        <Text style={S.textStyle}>마이페이지</Text>
      </TouchableOpacity>
      <View style={S.line}></View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 3,
  },
  textStyle: {
    fontSize: 20,
  },
  line: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default sideBarIndex;
