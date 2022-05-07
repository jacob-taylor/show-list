import { Alert } from "react-native";
import { API_URL } from "../../constants";

export const SET_LOGIN = "SET_LOGIN";
export const LOG_OUT = "LOG_OUT";
export const EDIT_USER = "EDIT_USER";
export const SET_SHOWS = "SET_SHOWS";
export const ADD_SHOW = "ADD_SHOW";
export const REMOVE_SHOW = "REMOVE_SHOW";
export const EDIT_SHOW = "EDIT_SHOW";

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
        throw new Error(reponseData?.error);
      } else {
        Alert.alert("Unable to Login", "Please try again");
        throw new Error("Unexpected Error");
      }
    } catch (err) {
      Alert.alert(err?.message);
      throw new Error(err?.message);
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
        throw new Error(reponseData?.error);
      } else {
        Alert.alert("Unable to Sign Up", "Please try again");
        throw new Error("Unexpected error");
      }
    } catch (err) {
      Alert.alert(err?.message);
      throw new Error(err?.message);
    }
  };
};

export const editUser = (data) => {
  return async (dispatch, getState) => {
    const { token, streaming_services, push_token, push_notifications } =
      getState().user;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const currentUserData = {
      streaming_services,
      push_token,
      push_notifications,
    };
    const body = JSON.stringify({ ...currentUserData, ...data });

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "PATCH",
        headers,
        body,
      });

      if (response.ok) {
        const responseData = await response.json();

        dispatch({
          type: EDIT_USER,
          ...responseData,
        });
      } else if (response.status === 400) {
        throw new Error(reponseData?.error);
      } else if (response.status === 401) {
        dispatch(logOut());
      } else {
        Alert.alert("Unable to edit user profile", "Please try again");
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

export const fetchShows = () => {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${API_URL}/shows`, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const responseData = await response.json();

        dispatch({
          type: SET_SHOWS,
          data: responseData.show_list,
        });
      } else if (response.status === 400) {
        throw new Error(reponseData?.error);
      } else if (response.status === 401) {
        dispatch(logOut());
      } else {
        Alert.alert("Unable to get shows", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};

export const addShow = (data) => {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({
      show: data,
    });

    try {
      const response = await fetch(`${API_URL}/shows`, {
        method: "POST",
        headers,
        body,
      });

      if (response.ok) {
        const responseData = await response.json();

        dispatch({
          type: ADD_SHOW,
          data: responseData.show,
        });
      } else if (response.status === 400) {
        Alert.alert("Unable to add show", "Please try again");
      } else if (response.status === 401) {
        dispatch(logOut());
      } else {
        Alert.alert("Unable to add show", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};

export const removeShow = (data) => {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({
      show: data,
    });

    try {
      const response = await fetch(`${API_URL}/shows`, {
        method: "DELETE",
        headers,
        body,
      });

      if (response.ok) {
        dispatch({
          type: REMOVE_SHOW,
          data,
        });
      } else if (response.status === 400) {
        Alert.alert("Unable to remove show", "Please try again");
      } else if (response.status === 401) {
        dispatch(logOut());
      } else {
        Alert.alert("Unable to remove show", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};

export const editShow = (data) => {
  return async (dispatch, getState) => {
    const { token } = getState().user;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({
      show: data,
    });

    try {
      const response = await fetch(`${API_URL}/shows`, {
        method: "PATCH",
        headers,
        body,
      });

      if (response.ok) {
        const responseData = await response.json();

        dispatch({
          type: EDIT_SHOW,
          data: responseData.show,
        });
      } else if (response.status === 400) {
        Alert.alert("Unable to edit show", "Please try again");
      } else if (response.status === 401) {
        dispatch(logOut());
      } else {
        Alert.alert("Unable to edit show", "Please try again");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
};
