import { LOG_OUT, SET_LOGIN } from "../actions/user";

const initialUserState = { loggedIn: false };

const userReducer = (user = initialUserState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { loggedIn: true };
    case LOG_OUT:
      return initialUserState;
    default:
      return user;
  }
};

export default userReducer;
