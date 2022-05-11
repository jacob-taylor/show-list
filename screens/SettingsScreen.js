import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ImageBackground,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logOut } from "../state/actions/user";
import NotificationModal from "../components/modals/NotificationModal";
import ShowStatusModal from "../components/modals/ShowStatusModal";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
//TODO Add modal for push notification, favorites, and add contact us functionality
// maybe find icons for each selection

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const [showStatusModalVisible, setShowStatusModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/settings-bg.png")}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          width: screenWidth,
          height: screenHeight,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.2)",
          position: "absolute",
          top: 0,
          bottom: 0,
          width: screenWidth,
          height: screenHeight,
        }}
        pointerEvents="none"
      ></View>
      <SafeAreaView style={styles.topContainer}>
        <Image
          source={require("../assets/settings-title.png")}
          style={styles.title}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setNotificationModalVisible(true);
          }}
        >
          <Text>Push Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setShowStatusModalVisible(true);
            setStatus("favorited");
          }}
        >
          <Text>My Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setShowStatusModalVisible(true);
            setStatus("watched");
          }}
        >
          <Text>Previously Watched</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Linking.openURL("mailto:info@thelistnow.com");
          }}
        >
          <Text>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { position: "absolute" }]}
          onPress={() => {
            dispatch(logOut());
          }}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
        <ShowStatusModal
          modalVisible={showStatusModalVisible}
          setModalVisible={setShowStatusModalVisible}
          status={status}
          setStatus={setStatus}
        />
        <NotificationModal
          modalVisible={notificationModalVisible}
          setModalVisible={setNotificationModalVisible}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#fff",
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: {
    height: screenHeight * 0.15,
    width: screenWidth * 0.9,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "blue",
    borderWidth: 1,
  },
  btn: {
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    marginBottom: 20,
    borderRadius: 12,
    height: screenHeight * 0.05,
    width: screenWidth * 0.5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default SettingsScreen;
