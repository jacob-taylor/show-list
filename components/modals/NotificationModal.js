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

const NotificationModal = ({ modalVisible, setModalVisible }) => {
  const [notifications, setNotifications] = useState({ on: true, off: false });
  const pressHandler = (press) => {
    if (press === "on") {
      setNotifications({ yes: !notifications.on });
    } else if (press === "off") {
      setNotifications({ no: !notifications.off });
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Enable Push Notifications</Text>
          <View style={styles.optionsView}>
            <View style={styles.checkBox}>
              <TouchableOpacity onPress={() => pressHandler("on")}>
                <Ionicons
                  name="checkmark"
                  color={notifications.yes ? "black" : "white"}
                  size={32}
                />
              </TouchableOpacity>
            </View>
            <Text>ON</Text>
          </View>
          <View style={styles.optionsView}>
            <View style={styles.checkBox}>
              <TouchableOpacity onPress={() => pressHandler("off")}>
                <Ionicons
                  name="checkmark"
                  color={notifications.no ? "black" : "white"}
                  size={32}
                />
              </TouchableOpacity>
            </View>
            <Text>OFF</Text>
          </View>
          <Button
            title="Close"
            onPress={() => {
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
  optionsView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox: {
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default NotificationModal;
