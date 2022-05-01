import { LOG_OUT, SET_LOGIN } from "../actions/user";

// App wide user state
const initialUserState = {
  loggedIn: false,
  token: "",
  _id: "",
  show_list: [],
  streaming_services: [],
  email: "",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        token: action.token,
        ...action.user,
        loggedIn: true,
      };
    case LOG_OUT:
      return initialUserState;
    default:
      return state;
  }
};

export default userReducer;
