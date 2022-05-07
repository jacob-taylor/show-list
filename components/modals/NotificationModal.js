import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../state/actions/user";
import { registerForPushNotificationsAsync } from "../../utils";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const NotificationModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [notifications, setNotifications] = useState(user?.push_notifications);

  const pressHandler = (press) => {
    setNotifications(press === "on");
  };

  const onSave = async () => {
    const pushToken = notifications
      ? await registerForPushNotificationsAsync()
      : "";

    if (notifications && !pushToken) {
      setNotifications(false);
      return Alert.alert(
        "Unable to turn on Push Notifications",
        "To turn on Push notifications, enable in device permissions",
        [
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }

    const editUserBody = {
      push_notifications: notifications,
      push_token: pushToken,
    };
    await dispatch(editUser(editUserBody));

    setModalVisible(false);
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Enable Push Notifications
          </Text>
          <View style={styles.optionsView}>
            <Text style={{ padding: 15, fontWeight: "bold" }}>ON</Text>
            <View style={styles.checkBox}>
              <TouchableOpacity onPress={() => pressHandler("on")}>
                <Ionicons
                  name="checkmark"
                  color={notifications ? "black" : "white"}
                  size={32}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ padding: 15, fontWeight: "bold" }}>OFF</Text>
            <View style={styles.checkBox}>
              <TouchableOpacity onPress={() => pressHandler("off")}>
                <Ionicons
                  name="checkmark"
                  color={!notifications ? "black" : "white"}
                  size={32}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Button title="Save" onPress={onSave} />
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
    height: screenHeight * 0.25,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  checkBox: {
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: "center",
  },
});

export default NotificationModal;
