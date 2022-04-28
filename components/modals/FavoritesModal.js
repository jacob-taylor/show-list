import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL,
  MOVIEDB_POSTER_URL,
  IMDB_URL,
} from "../../constants";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const FavoritesModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}
        style={styles.closeBtn}
      >
        <Ionicons name="close" color="white" size={30} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 35,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});

export default FavoritesModal;
