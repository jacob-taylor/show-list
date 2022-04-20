import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const RatingModal = ({ modalVisible, setModalVisible, rating, setRaiting }) => {
  const pressHandler = (num) => {
    setRaiting(num);
    setModalVisible(false);
  };
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => pressHandler(1)}>
            <Ionicons
              name={rating >= 1 ? "star" : "star-outline"}
              color={rating >= 1 ? "#ffc107" : "black"}
              size={45}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler(2)}>
            <Ionicons
              name={rating >= 2 ? "star" : "star-outline"}
              color={rating >= 2 ? "#ffc107" : "black"}
              size={45}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler(3)}>
            <Ionicons
              name={rating >= 3 ? "star" : "star-outline"}
              color={rating >= 3 ? "#ffc107" : "black"}
              size={45}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler(4)}>
            <Ionicons
              name={rating >= 4 ? "star" : "star-outline"}
              color={rating >= 4 ? "#ffc107" : "black"}
              size={45}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressHandler(5)}>
            <Ionicons
              name={rating >= 5 ? "star" : "star-outline"}
              color={rating >= 5 ? "#ffc107" : "black"}
              size={45}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  modalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: screenHeight * 0.1,
    width: screenWidth * 0.75,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
  },
});

export default RatingModal;
