import { useState } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { CURTAIN_RED } from "../constants";
import { fetchLogin } from "../state/actions/user";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const formHandler = (field, value) => {
    setFormData((formData) => ({ ...formData, [field]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    await dispatch(fetchLogin(formData)).catch((err) => {
      setLoading(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/login-bg-2.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.backgroundOverlay} pointerEvents="none"></View>
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
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.txt}>Email</Text>
            <TextInput
              style={styles.txtInput}
              value={formData.email}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="off"
              onChangeText={(text) => {
                formHandler("email", text);
              }}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.txt}>Password</Text>
            <TextInput
              style={styles.txtInput}
              value={formData.password}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={(text) => {
                formHandler("password", text);
              }}
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator
            style={{
              height: 50,
            }}
            color={CURTAIN_RED}
            size="large"
          />
        ) : (
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: CURTAIN_RED }}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "70%",
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
  signUpBtn: {
    backgroundColor: "white",
    marginTop: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: "25%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 10,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
  },
});

export default LoginScreen;
