import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import Login from './screens/Login';
import Loading from './screens/Loading';
import User from './screens/User';
import CalendarHome from "./screens/CalenderHome";
import AddNewEvent from "./screens/AddNewEvent";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReady(false);
    }, 2000);
  }, []);

  // 로그인이 성공적으로 이루어졌을 때 처리하는 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 처리하는 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (ready) {
    return <Loading />; // 처음 화면
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        // 사용자가 로그인한 경우 메인 화면
        <>
          <Login onLogout={handleLogout} />
          <User />
        </>
      ) : (
        // 로그인 안 한 경우 로그인 화면 보여줌
        <Login onLogin={handleLogin} />
      )}
      <StatusBar style="auto" />
      {/* <CalendarHome />
      <AddNewEvent /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
