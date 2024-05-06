import React from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export const AppleLoginWebview = ({ isOpen, onClose, onMessage, loginUri }) => {
  return (
    <SafeAreaView style={{ flex: 0.5 }}>
      <Modal
        visible={isOpen} // changed isOpen to visible
        onRequestClose={onClose} // changed onClose to onRequestClose
        animationType="slide"
        presentationStyle="formSheet"
      >
        <WebView
          source={{
            uri: "https://appleid.apple.com/auth/authorize?client_id=site.apps.cookiee&redirect_uri=https://cookiee.site/login/apple/callback&response_type=code%20id_token&scope=name%20email&response_mode=form_post",
          }}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          originWhitelist={["*"]}
          cacheEnabled={false}
          incognito={true}
          onMessage={(event) => onMessage(event)}
          containerStyle={{ flex: 0.6 }}
        />
      </Modal>
    </SafeAreaView>
  );
};
