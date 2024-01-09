import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import getCate from "../../api/category/getCate";

export default function EventBox() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getCate(userId);
        if (!completed) {
          if (result != null) {
            setData(result);
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

  return (
    <View style={styles.AddEventContainer}>
      <View style={styles.FirstEventImageContainer}>
        <View style={styles.FirstEventImageBox}>
          {/* <Text>선택한 사진 중 첫번째 사진이 들어가는 공간</Text> */}
        </View>
      </View>
      <View style={styles.EventInfoContainer}>
        <View style={styles.EventInfo}>
          {data.map((category, index) => (
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
            <Text style={styles.EventInfoDetailText}>13:00-15:00</Text>
          </View>
        </View>

        <View style={styles.EventInfo}>
          <View style={styles.EventInfoName}>
            <Text style={styles.EventInfoNameText}>장소</Text>
          </View>
          <View style={styles.EventInfoDetail}>
            <Text style={styles.EventInfoDetailText}>스타벅스 강남점</Text>
          </View>
        </View>

        <View style={styles.EventInfo}>
          <View style={styles.EventInfoName}>
            <Text style={styles.EventInfoNameText}>내용</Text>
          </View>
          <View style={styles.EventInfoDetail}>
            <Text style={styles.EventInfoDetailText}>맛있는 자허블</Text>
          </View>
        </View>

        <View style={styles.EventInfo}>
          <View style={styles.EventInfoName}>
            <Text style={styles.EventInfoNameText}>사람</Text>
          </View>
          <View style={styles.EventInfoDetail}>
            <Text style={styles.EventInfoDetailText}>민서랑</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddEventContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    height: "auto",
    margin: 5,
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
    borderRadius: 10,
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
});
