import { ADD_SHOW, LOG_OUT, REMOVE_SHOW, SET_LOGIN } from "../actions/user";

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
    case ADD_SHOW:
      return { ...state, show_list: [...state.show_list, action.data] };
    case REMOVE_SHOW:
      return {
        ...state,
        show_list: state.show_list.filter((s) => s.id !== action.data.id),
      };
    default:
      return state;
  }
};

export default userReducer;
