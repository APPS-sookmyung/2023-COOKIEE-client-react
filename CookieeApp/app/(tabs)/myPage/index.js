import React from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const myPage = () => {
    const navigation = useNavigation(); 

    const goBack = () => {
        navigation.goBack();
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.titleHeader}>
                <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
                    <AntDesign name="arrowleft" size={30} color="#594E4E" />
                </TouchableOpacity>
                <Text style={styles.title}>마이페이지</Text>
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

export default myPage;