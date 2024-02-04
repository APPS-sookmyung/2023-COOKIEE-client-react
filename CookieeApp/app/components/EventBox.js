import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useState } from "react";

export default function EventBox(eventData) {
  const event = eventData.eventData;

  if (event != null) {
    return (
      <View style={styles.AddEventContainer}>
        <View style={styles.FirstEventImageContainer}>
          <View style={styles.FirstEventImageBox}>
            <ImageBackground
              source={{ uri: event.imageUrlList[0] }}
              resizeMode="cover"
              imageStyle={styles.image}
            >
              <Text style={styles.test}></Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.EventInfoContainer}>
          <View style={styles.EventInfo}>
            {event.categories.map((category, index) => (
              <View
                key={index}
                style={{
                  ...styles.EventInfoCategoryBox,
                  backgroundColor: category.categoryColor,
                }}
              >
                <Text style={styles.EventInfoCategoryText}>
                  #{category.categoryName}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.EventInfo}>
            <View style={styles.EventInfoName}>
              <Text style={styles.EventInfoNameText}>시간</Text>
            </View>
            <View style={styles.EventInfoDetail}>
              <Text style={styles.EventInfoDetailText}>
                {event.startTime}-{event.endTime}
              </Text>
            </View>
          </View>

          <View style={styles.EventInfo}>
            <View style={styles.EventInfoName}>
              <Text style={styles.EventInfoNameText}>장소</Text>
            </View>
            <View style={styles.EventInfoDetail}>
              <Text style={styles.EventInfoDetailText}>{event.eventWhere}</Text>
            </View>
          </View>

          <View style={styles.EventInfo}>
            <View style={styles.EventInfoName}>
              <Text style={styles.EventInfoNameText}>내용</Text>
            </View>
            <View style={styles.EventInfoDetail}>
              <Text style={styles.EventInfoDetailText}>{event.what}</Text>
            </View>
          </View>

          <View style={styles.EventInfo}>
            <View style={styles.EventInfoName}>
              <Text style={styles.EventInfoNameText}>사람</Text>
            </View>
            <View style={styles.EventInfoDetail}>
              <Text style={styles.EventInfoDetailText}>{event.withWho}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>No Event</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddEventContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    height: "auto",
    marginVertical: 7,
    marginHorizontal: 15,
  },
  FirstEventImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: "50%",
    height: "auto",
  },
  FirstEventImageBox: {
    width: "90%",
    height: 170,
    backgroundColor: "#EBEBEB",
    alignSelf: "center",
  },
  EventInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
    width: "50%",
    height: "auto",
  },
  EventInfo: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "cyan",
    margin: 4,
    // marginLeft: 20,
  },
  EventInfoName: {
    // backgroundColor: "yellow",
    padding: 2,
    margin: 2,
  },
  EventInfoNameText: {
    fontSize: 17,
    color: "gray",
  },
  EventInfoDetail: {
    // backgroundColor: "lavender",
    padding: 1,
    margin: 1,
    marginLeft: 7,
  },
  EventInfoDetailText: {
    fontSize: 17,
  },
  EventInfoCategoryBox: {
    backgroundColor: "lavender",
    width: "auto",
    padding: 2,
    margin: 2,
    borderRadius: 10,
    padding: 5,
  },
  EventInfoCategoryText: {
    fontSize: 15,
  },
  test: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  image: { borderRadius: 5 },
});
