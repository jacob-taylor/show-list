import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
//TODO Add modal for push notification, favorites, and add contact us functionality
// maybe find icons for each selection

const SettingsScreen = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.btns}>
          <Text>Push Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text>My Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text>Contact Us</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.btns, { position: "absolute" }]}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 1,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "blue",
    borderWidth: 1,
  },
  btns: {
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    height: screenHeight * 0.05,
    width: screenWidth * 0.5,
  },
});

export default SettingsScreen;
