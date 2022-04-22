import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
//TODO Add modal for push notification, favorites, and add contact us functionality
// maybe find icons for each selection

const SettingsScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/settings-bg.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
        <SafeAreaView style={styles.topContainer}>
          <Image
            source={require("../assets/settings-title.png")}
            style={styles.title}
          />
          <TouchableOpacity style={styles.btn}>
            <Text>Push Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>My Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { position: "absolute" }]}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
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
