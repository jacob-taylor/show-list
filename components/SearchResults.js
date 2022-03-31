import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;

const SearchResults = ({ resState }) => {
  return (
    <View>
      <Text>PLACEHOLDER</Text>
      <Text>PLACEHOLDER</Text>
      <Text>PLACEHOLDER</Text>
      <Text>PLACEHOLDER</Text>
      <Text>PLACEHOLDER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 10,
    height: 60,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default SearchResults;
