import { Alert } from "react-native";
import { API_URL } from "../../constants";

export const SET_LOGIN = "SET_LOGIN";
export const LOG_OUT = "LOG_OUT";

export const fetchLogin = (data) => {
  return async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers,
      body,
    });
    const reponseData = await response.json();

    if (response.ok) {
      dispatch({
        type: SET_LOGIN,
        ...reponseData,
      });
    } else if (response.status === 404) {
      Alert.alert("Email not found", "Please try again");
    } else {
      Alert.alert("Unable to Login", "Please try again");
    }
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
