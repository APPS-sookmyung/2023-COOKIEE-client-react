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
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [categoryName, setCategoryName] = useState("");

    const goBack = () => {
        navigation.goBack();
    };

    const renderColorItem = ({ item }) => {
        return (
            <ColorItem
                color={item}
                onPress={() => setSelectedColor(item)}
            />
        );
    };

    const handleComplete = async () => {
        try {
          const userId = "1";
    
          const categoryData = {
            categoryName: categoryName,
            categoryColor: selectedColor,
          };
    
          const result = await postCate(userId, categoryData);
    
          if (result) {
            console.log("Category added successfully:", result);
            goBack();
          } else {
            console.log("Failed to add category");
          }
        } catch (error) {
          console.error("Error adding category:", error);
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
            <Text style={styles.title}>🍪 카테고리 추가</Text>
          </View>
    
          <View style={styles.centeredContainer}>
            <View style={styles.editContainer}>
              <View style={[styles.selectedColor, { backgroundColor: selectedColor }]} />
              <FlatList
                data={colors}
                renderItem={({ item }) => (
                  <ColorItem
                    color={item}
                    onPress={() => setSelectedColor(item)}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={5}
              />
              <TextInput
                style={styles.textInput}
                placeholder="카테고리를 입력하세요"
                placeholderTextColor="black"
                value={categoryName}
                onChangeText={(text) => setCategoryName(text)}
              />
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleComplete}
              >
                <Text style={styles.buttonStyle}>완료</Text>
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
    selectedColor: {
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