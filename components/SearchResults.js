import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
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
        console.log(item);
      }}
      onLongPress={() => {
        // TODO: Lets add a longPress feature where a modal pops up with more info about the show if the user needs to clarify
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text numberOfLines={1} style={{ width: "75%" }}>
          {item.title}
        </Text>
        <Text>{item.media_type}</Text>
      </View>
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ resState }) => {
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
    backgroundColor: "#fff",
    maxHeight: screenHeight * 0.5,
    width: screenWidth * 0.8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    position: "absolute",
    top: screenHeight * 0.275,
    paddingVertical: 5,
  },
  result: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
    borderRadius: 10,
  },
});

export default SearchResults;
