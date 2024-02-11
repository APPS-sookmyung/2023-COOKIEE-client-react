// import GoogleButton from 'react-google-button';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "cookiee",
    path: "redirect",
  });
  // console.log(redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "750908582355-4i3spir7ue0gj7n9l8afhfsp2iuv8m7e.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    responseType: "id_token",
  });

  const [user, setUser] = React.useState(null);

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

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/cookie.png")} />
      <Text style={styles.title_text}>Cookiee</Text>
      <Text style={styles.content_text1}>오늘 하루를 사진으로 기록해 </Text>
      <Text style={styles.content_text2}>나만의 쿠키를 만들어보아요 </Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Logged in as: {user.email}</Text>
          {/* 다른 사용자 정보도 여기에 추가할 수 있음 */}
        </View>
      )}
      {user === null && (
        <View>
          {/* 구글 로그인 */}
          <View>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Image
                source={require("../../assets/btn_google.png")}
                style={{ width: 300, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          {/* 애플 로그인 */}
          <View>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={{ width: 300, height: 50 }}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          </View>
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
    marginTop: 180,
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
  content_text1: {
    color: "#594E4E",
    fontSize: 20,
    paddingBottom: 5,
  },
  content_text2: {
    color: "#594E4E",
    fontSize: 20,
  },
  userInfo: {
    marginTop: 20,
  },
  userInfoText: {
    fontSize: 16,
  },
});
