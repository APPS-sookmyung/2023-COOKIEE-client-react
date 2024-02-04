import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

function UserGuide() {
    const router = useRouter();
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleHeader}>
                <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
                    <AntDesign name="arrowleft" size={30} color="#594E4E" />
                </TouchableOpacity>
                <Text style={styles.title}>User Guide</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>1. 블라블라 </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 3,
    },
    headerText: {
        fontSize: 16,
        marginBottom: 8,
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
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        fontSize: 20,
    },
});

export default UserGuide;
