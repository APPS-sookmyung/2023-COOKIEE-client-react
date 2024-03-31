import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/cookie.png")}
        // resizeMode="contain"
      />
      <Text style={styles.title_text}>Cookiee</Text>
      {/* <Text style={styles.content_text}>
        (영화 본편 이후에 나오는 에필로그)
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 335,
  },
  image: {
    width: 90,
    height: 90,
  },
  title_text: {
    color: "#594E4E",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 13,
  },
  content_text: {
    color: "#594E4E",
    fontSize: 20,
    paddingBottom: 3,
  },
});
