import {
  ADD_SHOW,
  EDIT_SHOW,
  LOG_OUT,
  REMOVE_SHOW,
  SET_LOGIN,
  SET_SHOWS,
  EDIT_USER,
} from "../actions/user";

// App wide user state
const initialUserState = {
  loggedIn: false,
  token: "",
  _id: "",
  show_list: [],
  streaming_services: [],
  email: "",
  push_token: "",
  push_notifications: true,
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
    case EDIT_USER:
      return {
        ...state,
        ...action.data,
      };
    case SET_SHOWS:
      return {
        ...state,
        show_list: action.data,
      };
    case ADD_SHOW:
      return { ...state, show_list: [...state.show_list, action.data] };
    case EDIT_SHOW:
      return {
        ...state,
        show_list: state.show_list.map((s) => {
          if (s._id === action.data._id) {
            return action.data;
          }
          return s;
        }),
      };
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
