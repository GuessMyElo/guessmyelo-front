import axios from "axiosConfig";
import jwt_decode from "jwt-decode";

const auth_token = localStorage.guessmyelo_auth_token
  ? localStorage.getItem("guessmyelo_auth_token")
  : null;
let user = null;

if (auth_token) {
  axios.get("/isAuth", {
    headers: {
      authorization: auth_token,
    },
  }).then((res) => {
      
  });
}

export const initialState = {
  auth_token,
  user,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("guessmyelo_auth_token", action.payload.accessToken);
      return {
        ...initialState,
        user: action.payload.user,
        auth_token: action.payload.accessToken,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: null,
        auth_token: null,
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
