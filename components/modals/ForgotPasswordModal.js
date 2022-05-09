import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ForgotPasswordModal = ({ modalVisible, setModalVisible }) => {
  const ResetForm = () => {
    return (
      <View style={styles.formContainer}>
        <Text>Reset Your Password</Text>
        <Text>
          Please provide your account email address to request a password reset
          code. You will receive your code to your email address if it is valid.
        </Text>
        <TextInput
          style={{ borderWidth: 1, width: "90%", height: 40 }}
          placeholder="Email Address"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={{ borderWidth: 1, padding: 10 }}>
          <Text>Request Reset Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const CodeForm = () => {
    return (
      <View style={styles.formContainer}>
        <Text>Reset Your Password</Text>
        <Text>Input the code sent to your email address.</Text>
        <TextInput
          style={{ borderWidth: 1, width: "90%", height: 40 }}
          placeholder="Input Code"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={{ borderWidth: 1, padding: 10 }}>
          <Text>Submit Code</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const NewPasswordForm = () => {
    return (
      <View style={styles.formContainer}>
        <Text>Reset Your Password</Text>
        <Text>Successfully verified. Input a new password.</Text>
        <TextInput
          style={{ borderWidth: 1, width: "90%", height: 40 }}
          placeholder="Password"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={{ borderWidth: 1, padding: 10 }}>
          <Text>Reset Password</Text>
        </TouchableOpacity>
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
        <ResetForm />
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
});

export default ForgotPasswordModal;
