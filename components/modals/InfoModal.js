import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const InfoModal = ({ modalVisible, setModalVisible, info }) => {
  const posterURL = "https://image.tmdb.org/t/p/original" + info.poster;
  console.log(posterURL);
  return (
    // TODO: Style Modal window with info and display poster
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <SafeAreaView style={styles.modalView}>
        <TouchableOpacity
          style={styles.infoTouch}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: posterURL }} />
          <Text>{info.title}</Text>
          <Text>{info.date}</Text>
          <Text>{info.media_type}</Text>
          <Text>{info.poster}</Text>
          <Ionicons name="trash" color="white" size={24} />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 50,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  infoTouch: {
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
export default InfoModal;
