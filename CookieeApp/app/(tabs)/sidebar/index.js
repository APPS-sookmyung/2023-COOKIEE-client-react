import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from '../../../api/user/getUser';

const sideBarIndex = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userId = 1;
      const data = await getUser(userId);
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={S.container}>

      <View style={S.profileContainer}>
        {userData?.profileImage && (
          <Image
            source={{ uri: userData.profileImage }}
            style={S.profileImage}
          />

        )}
        <View style={S.textContainer}>
          {/* <Text style={S.profileText}>Email: {userData?.email}</Text> */}
          <Text style={S.nicknameText}>{userData?.nickname}</Text>
          <Text style={S.selfDescriptionText}>{userData?.selfDescription}</Text>
        </View>
      </View>

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
  profileContainer: {
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    marginLeft: 30,
    justifyContent: "center",
  },
  nicknameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  selfDescriptionText: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default sideBarIndex;
