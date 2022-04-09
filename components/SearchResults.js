import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import InfoModal from "./modals/InfoModal";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

// * Gonna have to pass in some handlers to deal with HomeScreen state
// * PROP DRILLING!

const SearchResults = ({ resState, addShowToList }) => {
  const Result = ({ item }) => {
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    return (
      <TouchableOpacity
        style={styles.result}
        onPress={() => {
          addShowToList(item);
        }}
        onLongPress={() => {
          setInfoModalVisible(true);
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text numberOfLines={1} style={{ width: "75%" }}>
            {item.title}
          </Text>
          <Text>{item.media_type}</Text>
        </View>
        <Text>{item.date}</Text>
        <InfoModal
          modalVisible={infoModalVisible}
          setModalVisible={setInfoModalVisible}
          info={item}
          onList={false}
          addShowToList={addShowToList}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resState}
        renderItem={({ item }) => <Result item={item} />}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
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
    // top: 115 + screenHeight * 0.15, // * used if we keep the title shown while searching
    top: 115,
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
