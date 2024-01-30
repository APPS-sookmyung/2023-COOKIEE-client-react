import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

import getCate from "../../../api/category/getCate";
import { useRouter, useLocalSearchParams } from "expo-router";

const EventDetailIndex = () => {
  const router = useRouter();

  const { eventid } = useLocalSearchParams();

  const [cate, setCate] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getCate(userId);
        if (!completed) {
          if (result != null) {
            setCate(result);
            console.log(result);
          }
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

  const width = Dimensions.get("window").width;

  const data = [
    require("../../../assets/testImage/test.jpeg"),
    require("../../../assets/testImage/test2.jpeg"),
    require("../../../assets/testImage/test3.jpeg"),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View>
          <Text style={{ fontSize: 27, fontWeight: 600 }}>2023.12.20(수)</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.iconContainer}>
            <EvilIcons name="pencil" size={37} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <EvilIcons name="trash" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => router.back()}
          >
            <EvilIcons name="close" size={33} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Carousel
          loop
          mode="parallax"
          width={width}
          autoPlay={false}
          data={data}
          scrollAnimationDuration={2000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                source={item}
                style={{
                  width: width,
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 7,
                }}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"카테고리"}</Text>
            <View style={styles.EventInfoCategoryBox}>
              <View style={styles.EventInfo}>
                {cate.map((category, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.EventInfoCategoryBox,
                      backgroundColor: category.categoryColor,
                      marginRight: 10,
                    }}
                  >
                    <Text style={styles.EventInfoCategoryText}>
                      #{category.categoryName}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"시간"}</Text>
            <Text style={styles.contentDetail}>13:00-18:00</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"장소"}</Text>
            <Text style={styles.contentDetail}>제주도</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"내용"}</Text>
            <Text style={styles.contentDetail}>통귤 탕후루와 제주 꽃</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"함께한 사람"}</Text>
            <Text style={styles.contentDetail}>동기들</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventDetailIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginTop: 30,
    height: "5%",
    alignItems: "center",
  },
  imageSection: { height: "55%" },
  contentSection: {
    backgroundColor: "#F6F1E4",
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    marginHorizontal: 20,
  },
  contentContainer: {
    alignItems: "baseline",
    margin: 4,
  },
  contentTitleContainer: {
    margin: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contentDetail: { fontSize: 15 },
  contentTitle: {
    color: "#7C7C7C",
    fontSize: 15,
    width: 90,
  },

  iconContainer: {
    marginLeft: 5,
    alignItems: "center",
  },
  EventInfoCategoryBox: {
    width: "auto",
    padding: 2,
    borderRadius: 10,
    padding: 3,
  },
  EventInfo: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "cyan",
    marginHorizontal: 4,
    // marginLeft: 20,
  },
});
