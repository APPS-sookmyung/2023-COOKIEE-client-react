import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export const AppleLoginWebview = ({ isOpen, onClose, onMessage }) => {
  const handleNavigationStateChange = (navState) => {
    // 특정 URL에 도달했을 때의 조건 확인
    if (navState.url === "https://cookiee.site/login/apple/callback") {
      // 네비게이션 로딩이 완료될 때까지 대기
      if (!navState.loading) {
        // 로딩이 완료되었으면 웹뷰를 중단하고 onClose 함수 호출
        console.log("웹뷰 차단됨");
        onClose();
      } else {
        // 로딩이 아직 진행 중이면 네비게이션 상태를 계속 확인
        console.log("로딩 중:", navState.url);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 0.5 }}>
      <Modal
        visible={isOpen} // changed isOpen to visible
        onRequestClose={onClose} // changed onClose to onRequestClose
        animationType="slide"
        presentationStyle="pageSheet"
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
          onMessage={onMessage}
          onNavigationStateChange={handleNavigationStateChange}
          // onLoad={getHTML}
        />
      </Modal>
    </SafeAreaView>
  );
};
