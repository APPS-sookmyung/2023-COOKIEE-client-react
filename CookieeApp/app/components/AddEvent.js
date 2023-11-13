import { StyleSheet, Text, View } from "react-native";

export default function AddEvent() {
  return (
    <View style={styles.AddEventContainer}>
      <View style={styles.FirstEventImageContainer}>
        <View style={styles.FirstEventImageBox}>
          {/* <Text>선택한 사진 중 첫번째 사진이 들어가는 공간</Text> */}
        </View>
      </View>
      <View style={styles.EventInfoContainer}>
        <View style={styles.EventInfo}>
          <View style={styles.EventInfoCategoryBox}>
            <Text style={styles.EventInfoCategoryText}>#카페</Text>
          </View>
          <View style={styles.EventInfoCategoryBox}>
            <Text style={styles.EventInfoCategoryText}>#데이트</Text>
          </View>
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
    // flex: 0.5,
    display: "flex",
    flexDirection: "row",
    // alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "auto",
    height: "25%",
    margin: 10,
    // backgroundColor: "red",
  },
  FirstEventImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    width: "50%",
    height: "100%",
  },
  FirstEventImageBox: {
    borderRadius: 10,
    width: "90%",
    height: "90%",
    backgroundColor: "#EBEBEB",
    // position: "relative",
    alignSelf: "center",
  },
  EventInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
    width: "50%",
    height: "100%",
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
