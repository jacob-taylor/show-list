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
const screenHeight = Dimensions.get("screen").height;

// * Gonna have to pass in some handlers to deal with HomeScreen state
// * PROP DRILLING!
const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.result}
      onPress={() => {
        // TODO: Add item (show) to showlist and then clear searchState and resState
        console.log(item.title);
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{item.title}</Text>
        <Text>{item.media_type}</Text>
      </View>
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ resState }) => {
  // console.log(resState);
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
    // flex: 1,
    backgroundColor: "white",
    maxHeight: screenHeight * 0.5,
    width: screenWidth * 0.8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    position: "absolute",
    top: 140,
  },
  result: {
    flex: 1,
    backgroundColor: "#f5f520",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default SearchResults;
