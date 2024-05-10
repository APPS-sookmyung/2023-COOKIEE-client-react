// import GoogleButton from 'react-google-button';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { FontAwesome5 } from "@expo/vector-icons";

import { WebView } from "react-native-webview";
import { AppleLoginWebview } from "./AppleLogin";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "750908582355-4i3spir7ue0gj7n9l8afhfsp2iuv8m7e.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    responseType: "id_token",
  });

  const [user, setUser] = React.useState(null);

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (err) {
      console.error("Error signing in with Google:", err);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // 사용자 정보 가져오는 함수 호출
      fetchUserInfo(authentication.idToken);
    }
  }, [response]);

  // 사용자 정보 가져오는 함수
  const fetchUserInfo = async (idToken) => {
    try {
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
      );
      const userInfo = await userInfoResponse.json();
      setUser(userInfo);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const [isAppleLoginOpen, setIsAppleLoginOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/cookie.png")}
        />
        <Text style={styles.title_text}>Cookiee</Text>
        <Text style={styles.content_text}>오늘 하루를 사진으로 기록해</Text>
        <Text style={{ ...styles.content_text, paddingBottom: 5 }}>
          나만의 쿠키를 만들어보아요
        </Text>
      </View>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Logged in as: {user.email}</Text>
          {/* 다른 사용자 정보도 여기에 추가할 수 있음 */}
        </View>
      )}

      {user === null && (
        <View style={styles.buttonContainer}>
          {/* 구글 로그인 */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={!request}
          >
            <FontAwesome5 name="google" size={15} color="white" />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* 애플 로그인 */}
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={styles.button}
            onPress={() => setIsAppleLoginOpen(true)}
          />
          {isAppleLoginOpen && (
            <AppleLoginWebview
              isOpen={isAppleLoginOpen}
              onClose={() => setIsAppleLoginOpen(false)} // 웹뷰 닫기
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  introContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  title_text: {
    color: "#594E4E",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 13,
  },
  content_text: {
    color: "#594E4E",
    fontSize: 20,
  },

  userInfo: {
    marginTop: 20,
  },
  userInfoText: {
    fontSize: 16,
  },
  button: {
    width: 300,
    height: 50,
    margin: 5,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  googleText: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    marginLeft: 6,
  },
});
