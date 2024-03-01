import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { EvilIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

import { getEventById } from "../../../api/event/getEventById";
import { deleteEvent } from "../../../api/event/deleteEvent";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";

const EventDetailIndex = () => {
  const router = useRouter();

  const { eventid } = useLocalSearchParams();

  const [eventData, setEventData] = useState([]);
  const [eventImgData, setEventImgData] = useState([]);

  const [userId, setUserId] = useState(1);

  async function handelGetEventById() {
    console.log("handelGetEventById 실행");
    try {
      const event = await getEventById(userId, eventid);

      if (event != null) {
        setEventData(event);
        setEventImgData(event.imageUrlList);
        console.log("event: ", await event);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handelGetEventById();
    }, [])
  );

  const width = Dimensions.get("window").width;

  const hadleDeleteEvent = () => {
    console.log("이벤트 삭제 api");
    console.log(userId, eventid);
    Alert.alert(
      "이벤트 삭제하기",
      "정말로 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: async () => {
            const status = await deleteEvent(userId, eventid);
            console.log(status);
            router.back();
          },
        },
        {
          text: "취소",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const CategoryBox = ({ categoryName, categoryColor }) => {
    return (
      <View style={[styles.categoryBox, { backgroundColor: categoryColor }]}>
        <Text style={styles.categoryText}>#{categoryName}</Text>
      </View>
    );
  };

  if (eventData.eventId != null) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: "auto",
          }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.headerSection}>
            <View>
              <Text style={{ fontSize: 27, fontWeight: 600 }}>
                {eventData.EventYear}.{eventData.EventMonth}.
                {eventData.EventDate}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  router.push({
                    pathname: "updateForm",
                    params: {
                      eventId: eventid,
                    },
                  });
                }}
              >
                <EvilIcons name="pencil" size={37} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={hadleDeleteEvent}
              >
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
              data={eventImgData}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: width,
                      height: "100%",
                      resizeMode: "contain",
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
                <View style={styles.categoryContainer}>
                  {eventData.categories.map((category, index) => (
                    <CategoryBox
                      key={index}
                      categoryName={category.categoryName}
                      categoryColor={category.categoryColor}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>{"시간"}</Text>
                <Text style={styles.contentDetail}>
                  {eventData.startTime}-{eventData.endTime}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>{"장소"}</Text>
                <Text style={styles.contentDetail}>{eventData.eventWhere}</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>{"내용"}</Text>
                <Text style={styles.contentDetail}>{eventData.what}</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>{"함께한 사람"}</Text>
                <Text style={styles.contentDetail}>{eventData.withWho}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default EventDetailIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    display: "flex",
    width: "100%",
    flex: 1,
    position: "relative",
    paddingTop: 7,
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
    height: "auto",
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
  contentDetail: { fontSize: 15, flexGrow: 1, flexShrink: 1 },
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
    borderRadius: 10,
    padding: 5,
  },
  EventInfo: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "red",
  },
  EventInfoCategoryText: {
    fontSize: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  categoryBox: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: 5,
    marginVertical: 5,
  },
  categoryText: {
    fontSize: 15,
  },
});
