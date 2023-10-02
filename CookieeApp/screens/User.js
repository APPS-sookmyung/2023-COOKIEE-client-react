import { StatusBar } from "expo-status-bar";
import {
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Ionicons,
    Button,
  } from "react-native";
  import { useState } from "react";
import React from "react"; 

function User( { navigation }){
    nicknameState = {
      text: '',
      inputText: ''
    }

    submitBtn = () => {
      this.setState({})
    }

    return(
      <>
      <View style={S.titleHeader}>
        <Pressable style={S.menuIcon}>
          <Ionicons name="menu" size={40} color="#594E4E" />
        </Pressable>
        <Text style={S.title}>Cookiee</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>닉네임</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="닉네임을 입력해주세요"/>
        <Text style={styles.headerText}>한줄 소개 (50자)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="한줄 소개를 입력해주세요" />
        <Button 
          title="완료"
          onPress={() => navigation.navigate('CalendarHome')} 
        />
        </View></>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
  },
  headerText: {

  }
})

const S = StyleSheet.create({
  titleHeader: {
    marginTop: 80,
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
})