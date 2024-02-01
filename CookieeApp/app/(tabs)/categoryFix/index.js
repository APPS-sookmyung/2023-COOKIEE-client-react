import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import getCate from "../../../api/category/getCate";

const CategoryFix = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getCate(userId);
        if (!completed) {
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    get();
    return () => {
      completed = true;
    };
  }, [userId]); // userId가 변경될 때 마다 실행

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>카테고리 수정</Text>
      </View>
      <View style={styles.categoryList}>
        {data.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: category.categoryColor },
              ]}
            />
            <Text style={styles.categoryText}>{category.categoryName}</Text>
            <TouchableOpacity
              style={styles.categoryFixBtn}
              onPress={() => {
                router.push('categoryEdit', { categoryId: category.id });
              }}
            >
              <AntDesign name="edit" size={20} color="#594E4E" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => router.push("categoryAdd")}
        >
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <AntDesign name="plus" size={9} color="#FFF" />
          </View>
          <Text style={styles.categoryText}>추가하기</Text>
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
  categoryList: {
    marginTop: 20,
    marginLeft: 30,
  },
  categoryItem: {
    flexDirection: "row",
    marginVertical: 5,
  },
  colorBox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 20,
  },
  categoryFixBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    marginRight: 30,
  },
});

export default CategoryFix;
