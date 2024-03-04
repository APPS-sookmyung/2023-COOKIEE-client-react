import React, { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../../api/user/getUser";

const myPage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>마이페이지</Text>
      </View>

      <View style={styles.profileContainer}>
        {userData?.profileImage && (
          <Image
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.textContainer}>
          {/* <Text style={styles.profileText}>Email: {userData?.email}</Text> */}
          <Text style={styles.nicknameText}>{userData?.nickname}</Text>
          <Text style={styles.selfDescriptionText}>
            {userData?.selfDescription}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => router.push("myPageEdit")}
        >
          <Text style={styles.buttonText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => router.push("../../screens/UserGuide")}
        >
          <Text style={styles.buttonText}>사용 가이드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 3,
  },
  titleHeader: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    position: "absolute",
    fontSize: 27,
    fontWeight: "bold",
    color: "#594E4E",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  buttonStyle: {
    width: 368,
    height: 45,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
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
});

export default myPage;
