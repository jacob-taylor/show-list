import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.result}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ resState }) => {
  console.log(resState);
  return (
    <View style={styles.container}>
      <FlatList
        data={resState}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
  result: {
    backgroundColor: "#f5f520",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default SearchResults;
