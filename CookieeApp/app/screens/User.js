import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

function User() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleComplete = () => {
    if (!nickname || !intro) {
      setError("닉네임과 한줄 소개를 모두 입력해주세요.");
    } else {
      router.push("/home");
    }
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("카메라 롤 접근 권한이 필요합니다.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setProfileImage(pickerResult.uri);
      }
    } catch (error) {
      console.log("이미지 업로드 에러:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon}>
          <Ionicons name="menu" size={40} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>Cookiee</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.profileContainer}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.uploadText}>프로필 사진 추가</Text>
            </View>
          )}
        </TouchableOpacity>

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleComplete}
            >
              <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  titleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "#594E4E",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
  buttonStyle: {
    width: 368,
    height: 45,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {},
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    alignSelf: "center", // 중앙 정렬을 위한 가로 방향 정렬
    backgroundColor: "#EBEBEB",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profilePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 15,
    marginTop: 20,
  },
});

export default User;
