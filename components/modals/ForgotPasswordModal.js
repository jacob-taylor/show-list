import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../constants";

const screenHeight = Dimensions.get("screen").height;

const ForgotPasswordModal = ({ modalVisible, setModalVisible }) => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    code: null,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const handleRequestCode = async (email) => {
    try {
      const body = JSON.stringify({ email });
      const response = await fetch(`${API_URL}/reset`, {
        method: "POST",
        headers,
        body,
      });

      const responseData = await response.json();

      if (response.ok) {
        setFormData((formData) => ({
          ...formData,
          email,
        }));
        setStage(2);
      } else {
        throw Error(responseData?.msg);
      }
    } catch (error) {
      Alert.alert(error?.message);
      throw Error(error?.message);
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      const body = JSON.stringify({ code });
      const response = await fetch(`${API_URL}/code`, {
        method: "POST",
        headers,
        body,
      });

      const responseData = await response.json();

      if (response.ok) {
        setFormData((formData) => ({
          ...formData,
          code,
        }));
        setStage(3);
      } else {
        throw Error(responseData?.msg);
      }
    } catch (error) {
      Alert.alert(error?.message);
      throw Error(error?.message);
    }
  };

  const handleGoBack = () => {
    setStage(1);
  };

  const handleResetPassword = async (password) => {
    try {
      const body = JSON.stringify({
        email: formData.email,
        code: formData.code,
        password,
      });
      const response = await fetch(`${API_URL}/password`, {
        method: "POST",
        headers,
        body,
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert(
          "Password Reset",
          "You can now login with your new password",
          [
            {
              text: "Ok",
              onPress: () => {
                setModalVisible(false);
              },
            },
          ]
        );
      } else {
        throw Error(responseData?.msg);
      }
    } catch (error) {
      Alert.alert(error?.message);
      throw Error(error?.message);
    }
  };

  const ResetForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(formData.email);

    return (
      <View style={styles.formContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Reset Your Password
        </Text>
        <Text>
          Please provide your account email address to request a password reset
          code. You will receive your code to your email address if it is valid.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="gray"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="off"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" style={{ height: 45 }} />
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              setLoading(true);
              handleRequestCode(email).catch(() => {
                setLoading(false);
              });
            }}
          >
            <Text>Request Reset Code</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const CodeForm = () => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState();

    return (
      <View style={styles.formContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Reset Your Password
        </Text>
        <Text>Input the code sent to your email address.</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Code"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCompleteType="off"
          keyboardType="number-pad"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setLoading(true);
              handleVerifyCode(code).catch(() => {
                setLoading(false);
              });
            }}
          >
            <Text>Submit Code</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleGoBack}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const NewPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
      <View style={styles.formContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Reset Your Password
        </Text>
        <Text>Successfully verified. Input a new password.</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setLoading(true);
              handleResetPassword(password).catch(() => {
                setLoading(false);
              });
            }}
          >
            <Text>Reset Password</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" color="white" size={30} />
        </TouchableOpacity>
        {stage === 1 && <ResetForm />}
        {stage === 2 && <CodeForm />}
        {stage === 3 && <NewPasswordForm />}
        <View></View>
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
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: screenHeight * 0.3,
  },
  input: {
    borderWidth: 1,
    width: "90%",
    height: 40,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    height: 45,
  },
});

export default ForgotPasswordModal;
