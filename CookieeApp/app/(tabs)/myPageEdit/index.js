import React, { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const myPageEdit = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>마이페이지 수정</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>닉네임</Text>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임을 입력해주세요"
          onChangeText={(text) => setNickname(text)}
          value={nickname}
        />
        <Text style={styles.headerText}>한줄 소개 (50자)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="한줄 소개를 입력해주세요"
          onChangeText={(text) => setIntro(text)}
          value={intro}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
        // onPress={handleComplete}
        >
          <Text style={styles.buttonText}>프로필 수정</Text>
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
  inputContainer: {
    marginTop: 38,
    marginLeft: 32,
    marginRight: 32,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#EBEBEB",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default myPageEdit;