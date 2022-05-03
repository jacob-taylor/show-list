import { Alert } from "react-native";
import { API_URL } from "../../constants";

export const SET_LOGIN = "SET_LOGIN";
export const LOG_OUT = "LOG_OUT";
export const ADD_SHOW = "ADD_SHOW";

export const fetchLogin = (data) => {
  return async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    try {
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
      } else if (response.status === 400) {
        Alert.alert(reponseData.error);
      } else {
        Alert.alert("Unable to Login", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    try {
      const response = await fetch(`${API_URL}/users`, {
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
      } else if (response.status === 400) {
        Alert.alert(reponseData.error);
      } else {
        Alert.alert("Unable to Sign Up", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const addShow = (data) => {
  return { type: ADD_SHOW, data };
};
