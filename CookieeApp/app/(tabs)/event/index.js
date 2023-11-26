import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

const EventDetailIndex = () => {
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
        <Text>사진 슬라이더</Text>
      </View>
      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"카테고리"}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"시간"}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"장소"}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"내용"}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{"함께한 사람"}</Text>
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
    padding: 10,
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 15,
    height: "5%",
    alignItems: "center",
  },
  imageSection: { backgroundColor: "yellow", margin: 10, height: "50%" },
  contentSection: {
    backgroundColor: "#F6F1E4",
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    margin: 10,
  },
  contentContainer: {
    alignItems: "baseline",
    margin: 4,
  },
  contentTitleContainer: { margin: 7 },
  contentTitle: {
    color: "#7C7C7C",
    fontSize: 15,
  },
  iconContainer: {
    marginLeft: 5,
    alignItems: "center",
  },
});
