import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

//TODO Make sure to add an unique ID for manually added shows
const AddShowModal = ({ modalVisible, setModalVisible, addShowToList }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" color="white" size={30} />
        </TouchableOpacity>
        <Image
          source={require("../../assets/empty-poster.png")}
          style={styles.streamingImg}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#0044D0" }]}
          onPress={() => {
            //need to add user intput into "info" : addShowToList(info);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Add to List
          </Text>
        </TouchableOpacity>
      </View>
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
  btn: {
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
    marginTop: 10,
    width: "100%",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  streamingImg: {
    height: screenHeight * 0.3,
    width: screenWidth * 0.7,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default AddShowModal;
