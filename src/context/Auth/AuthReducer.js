import jwt_decode from "jwt-decode";

const auth_token = localStorage.guessmyelo_auth_token ? localStorage.getItem("guessmyelo_auth_token") : null;
let user = null;

if (auth_token) {
    const decryptedToken = jwt_decode(auth_token);
    const currentDate = new Date();
    const expDate = new Date(decryptedToken.exp * 1000);
    user = currentDate <= expDate ? decryptedToken.user : null
}

export const initialState = {
    auth_token: auth_token,
    user: user,
    loading: false,
    errorMessage: null
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            }
        case "LOGIN_SUCCESS":
            console.log(action.payload)
            return {
                ...initialState,
                user: action.payload.user,
                auth_token: action.payload.accessToken,
                loading: false
            }
        case "LOGOUT":
            return {
                ...initialState,
                user: null,
                auth_token: null
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}