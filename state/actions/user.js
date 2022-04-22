export const SET_LOGIN = "SET_LOGIN";
export const LOG_OUT = "LOG_OUT";

export const fetchLogin = (data) => {
  return async (dispatch) => {
    // Doing async dispatch to prep for auth api call
    dispatch({
      type: SET_LOGIN,
    });
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
