import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

const EventDetailIndex = () => {
  const width = Dimensions.get("window").width;

  const data = [
    require("../../../assets/testImage/IMG_2917.jpeg"),
    require("../../../assets/testImage/IMG_2938.jpeg"),
    require("../../../assets/testImage/IMG_2941.jpeg"),
    require("../../../assets/testImage/IMG_2962.jpeg"),
    require("../../../assets/testImage/IMG_3007.jpeg"),
    require("../../../assets/testImage/IMG_3022.jpeg"),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View>
          <Text style={{ fontSize: 27, fontWeight: 600 }}>2023.11.27(월)</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.iconContainer}>
            <EvilIcons name="pencil" size={37} color="black" />
          </View>
          <View style={styles.iconContainer}>
            <EvilIcons name="trash" size={35} color="black" />
          </View>
          <View style={styles.iconContainer}>
            <EvilIcons name="close" size={33} color="black" />
          </View>
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
              <Text style={styles.contentDetail}>#맛집</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"시간"}</Text>
            <Text style={styles.contentDetail}>8:00</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"장소"}</Text>
            <Text style={styles.contentDetail}>홍대 연정</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"내용"}</Text>
            <Text style={styles.contentDetail}>꼬치랑 어묵에 소주..</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"함께한 사람"}</Text>
            <Text style={styles.contentDetail}>민서</Text>
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
    backgroundColor: "lavender",
    width: "auto",
    padding: 2,
    borderRadius: 10,
    padding: 3,
  },
});
