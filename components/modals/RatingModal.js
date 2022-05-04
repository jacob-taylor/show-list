import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const RatingModal = ({
  modalVisible,
  setModalVisible,
  show,
  ratingHandler,
}) => {
  const [rating, setRating] = useState(0);

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      {/* <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: screenHeight,
          width: screenWidth,
        }}
        activeOpacity={1}
        onPress={() => {
          // If the user presses the backdrop behind the modal, close it
          setModalVisible(false);
        }}
      ></TouchableOpacity> */}
      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={styles.modalView}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", paddingHorizontal: 10 }}
            numberOfLines={1}
          >
            Rate {show.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => setRating(1)} activeOpacity={1}>
              <Ionicons
                name={rating >= 1 ? "star" : "star-outline"}
                color="#ffc107"
                size={45}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(2)} activeOpacity={1}>
              <Ionicons
                name={rating >= 2 ? "star" : "star-outline"}
                color="#ffc107"
                size={45}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(3)} activeOpacity={1}>
              <Ionicons
                name={rating >= 3 ? "star" : "star-outline"}
                color="#ffc107"
                size={45}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(4)} activeOpacity={1}>
              <Ionicons
                name={rating >= 4 ? "star" : "star-outline"}
                color="#ffc107"
                size={45}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRating(5)} activeOpacity={1}>
              <Ionicons
                name={rating >= 5 ? "star" : "star-outline"}
                color="#ffc107"
                size={45}
              />
            </TouchableOpacity>
          </View>
          <Button
            title="Rate"
            onPress={() => {
              ratingHandler(rating);
              setModalVisible(false);
            }}
          />
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
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: screenHeight * 0.2,
    width: screenWidth * 0.75,
    borderColor: "black",
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
  },
});

export default RatingModal;
