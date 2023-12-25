import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import getCate from "../../../api/category/getCate";
import { useGlobalSearchParams } from "expo-router";

const showCookiee = () => {
  // const [data, setData] = useState([]);
  // const [userId, setUserId] = useState(1);

  // useEffect(() => {
  //   let completed = false; // 첫 번째 1회 실행을 위한 flag

  //   async function get() {
  //     try {
  //       const result = await getCate(userId);
  //       if (!completed) {
  //         setData(result);
  //         console.log(result);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   get();
  //   return () => {
  //     completed = true;
  //   };
  // }, [userId]); // userId가 변경될 때 마다 실행

  const { cate } = useGlobalSearchParams();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const categories = [
    { name: "카페", color: "#FFC3C3B2" },
    { name: "데이트", color: "#D0FFBA" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>{cate}</Text>
      </View>
      <View>
        <Text>dd</Text>
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
});

export default showCookiee;
