import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const AddShowModal = ({ modalVisible, setModalVisible, addShowToList }) => {
  const [titleState, setTitleState] = useState("");
  const pressHandler = () => {
    if (titleState !== "") {
      const show = {
        id: Math.floor(Math.random() * 999999) + 1,
        title: titleState,
        favorited: false,
        watched: false,
        rating: 0,
      };
      addShowToList(show);
    }
  };
  const titleHandler = (text) => {
    setTitleState(text);
  };
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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Movie / TV Title"
            placeholderTextColor="gray"
            value={titleState}
            onChangeText={(newText) => titleHandler(newText)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#0044D0" }]}
          onPress={() => pressHandler()}
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
    alignItems: "center",
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
  inputContainer: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  streamingImg: {
    height: screenHeight * 0.35,
    width: screenWidth * 0.7,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default AddShowModal;
