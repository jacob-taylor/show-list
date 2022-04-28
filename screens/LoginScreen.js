import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { CURTAIN_RED } from "../constants";
import { fetchLogin } from "../state/actions/user";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const LoginScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/login-bg-2.png")}
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
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../assets/title.png")}
          style={{
            height: screenHeight * 0.15,
            width: screenWidth * 0.9,
            marginBottom: screenHeight * 0.05,
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <View style={styles.textInputContainer}>
            <Text style={styles.txt}>Email</Text>
            <TextInput style={styles.txtInput} />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.txt}>Password</Text>
            <TextInput style={styles.txtInput} />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            dispatch(fetchLogin());
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  txt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  txtInput: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 20,
    padding: 10,
  },
  loginBtn: {
    backgroundColor: CURTAIN_RED,
    width: "50%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default LoginScreen;
