import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../../../api/user/getUser";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const sideBarIndex = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userId = 32;
      const data = await getUser(userId);
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <SafeAreaView style={S.container}>
      <View style={S.titleHeader}>
        <TouchableOpacity style={S.menuIcon} onPress={router.back}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
      </View>
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
    marginTop: 15,
  },
  line: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    width: "100%",
    marginTop: 15,
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
    fontWeight: "bold",
    marginVertical: 8,
  },
  selfDescriptionText: {
    fontSize: 16,
    marginVertical: 8,
  },
  titleHeader: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
});

export default sideBarIndex;
