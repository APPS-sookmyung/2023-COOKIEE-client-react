// import GoogleButton from 'react-google-button';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    responseType: 'id_token'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/cookie.png')}
        />
        <Text style={styles.title_text}>
          Cookiee
        </Text>
        <Text style={styles.content_text1}>
          오늘 하루를 사진으로 기록해 </Text>
          <Text style={styles.content_text2}>
          나만의 쿠키를 만들어보아요 </Text>
      </View>
      <View style={styles.button_style}>
        <Button
          disabled={!request}
          title="Google 로그인하기"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
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
  button_style: {
    alignItems: "center",
    marginBottom: 200,
  },
  image: {
    width: 90,
    height: 90,
  },
  title_text: {
    color: "#594E4E",
    fontSize: 40,
    fontWeight: 'bold',
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
});