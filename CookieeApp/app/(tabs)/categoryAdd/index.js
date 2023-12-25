import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { postCate } from "../../../api/category/postCate";

const ColorItem = ({ color, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.colorItem, { backgroundColor: color }]}
            onPress={onPress}
        />
    );
};

const CategoryAdd = () => {
    const navigation = useNavigation();
    const [categoryColor, setCategoryColor] = useState("#FFFFFF");

    const goBack = () => {
        navigation.goBack();
    };

    const renderColorItem = ({ item }) => {
        return (
            <ColorItem
                color={item}
                onPress={() => setCategoryColor(item)}
            />
        );
    };

    const [categoryName, setCategoryName] = useState(""); // 카테고리 이름 상태 추가
    const [userId, setUserId] = useState(1);
    
    const handleComplete = async () => {
        try {
            const categoryData = {
                name: categoryName,
                color: categoryColor,
            };

            if (categoryName.trim() === "") {
                console.log("카테고리 이름을 입력하세요!");
                return;
            }

            const result = await postCate(categoryData, userId);

            if (result) {
                console.log("카테고리가 성공적으로 추가되었습니다.");
                console.log(result);
                goBack();
            } else {
                console.log("카테고리 추가에 실패했습니다.");
                console.log(result)
            }
        } catch (error) {
            console.error("카테고리 추가 중 오류 발생:", error);
        }
    };

    const colors = [
        "#FFC3C3B2", "#D0FFBA", "#9370DB", "#FFB6C1", "#87CEFA", "#FFD700", "#40E0D0", "#FF69B4", "#7B68EE", "#FFA500", "#00FA9A", 
        "#DA70D6", "#FFE4E1", "#00FFFF", "#FF6347", "#8A2BE2", "#FF4500", "#ADFF2F", "#FF00FF", "#FFFF00"  
    ];
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleHeader}>
                <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
                    <AntDesign name="arrowleft" size={30} color="#594E4E" />
                </TouchableOpacity>
                <Text style={styles.title}>카테고리 추가</Text>
            </View>

            <View style={styles.centeredContainer}>
                <View style={styles.editContainer}>
                    <View style={[styles.categoryColor, { backgroundColor: categoryColor }]} />
                    <FlatList
                        data={colors}
                        renderItem={({ item }) => (
                            <ColorItem
                                color={item}
                                onPress={() => setCategoryColor(item)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={5}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="카테고리를 입력하세요"
                        placeholderTextColor="black"
                        onChangeText={text => setCategoryName(text)}
                    />
                    <TouchableOpacity
                        style={styles.completeButton}
                        onPress={goBack}
                    >
                        <TouchableOpacity
                            style={[styles.completeButton, { alignSelf: 'center' }]} // 여기에 가운데 정렬 스타일 추가
                            onPress={handleComplete}
                        >
                            <Text style={styles.buttonStyle}>완료</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    editContainer: {
        backgroundColor: "#F1F1F1",
        width: 300,
        height: 400,
        alignItems: "center",
        justifyContent: "center",
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryColor: {
        width: 50,
        height: 50,
        marginTop: 20,
        borderWidth: 0,
        borderRadius: 15,
    },
    colorPicker: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    colorItem: {
        marginTop: 10,
        width: 40,
        height: 40,
        borderRadius: 15,
    },
    textInput: {
        width: "80%",
        height: 40,
        backgroundColor: "#FFFFFF",
        color: "#000000",
        marginBottom: 30,
    },
    completeButton: {
        marginBottom: 10,
        width: 50,
        height: 30,
        backgroundColor: "#FFF6F1E4",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
});

export default CategoryAdd;