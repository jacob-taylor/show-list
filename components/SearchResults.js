import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import InfoModal from "./modals/InfoModal";
import AddShowModal from "./modals/AddShowModal";
import { getStatusBarHeight } from "react-native-status-bar-height";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const SearchResults = ({ resState, addShowToList }) => {
  const Result = ({ item }) => {
    const [loading, setLoading] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [addShowModalVisible, setAddShowModalVisible] = useState(false);

    return (
      <TouchableOpacity
        onPress={async () => {
          if (item.id === 0) {
            setAddShowModalVisible(true);
          } else {
            setLoading(true);

            await addShowToList(item);
          }
        }}
        onLongPress={() => {
          // Probably getting rid of this
          if (item.id !== 0) {
            setInfoModalVisible(true);
          } else {
            //What to add here?
          }
        }}
      >
        <View
          style={styles.result}
          onLongPress={() => {
            if (item.id !== 0) {
              setInfoModalVisible(true);
            }
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text numberOfLines={1} style={{ width: "75%" }}>
              {item.title}
            </Text>
            <Text>{item.media_type}</Text>
          </View>
          <Text>{item.date}</Text>
          <AddShowModal
            modalVisible={addShowModalVisible}
            setModalVisible={setAddShowModalVisible}
            addShowToList={addShowToList}
          />
          <InfoModal
            modalVisible={infoModalVisible}
            setModalVisible={setInfoModalVisible}
            info={item}
            onList={false}
            addShowToList={addShowToList}
            onHomeScreen={false}
          />
        </View>
        {loading ? (
          <View style={styles.overlay}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : null}
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
    top: 68 + getStatusBarHeight(),
    paddingVertical: 5,
  },
  result: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 54,
    width: 279,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 54,
    width: 279,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default SearchResults;
