import {SET_JWT,SET_JWT_ERROR,SET_CURRENT_USER,SET_TRANSACTIONS,SET_USERS, SET_MESSAGE,SET_ERROR, SET_REQUESTS, SET_ERROR_LOCK, SET_MESSAGE_LOCK} from "./ntatTypes";

const initialState = {
    jwt: "",
    isAuthenticated: "false",
    loggedInUser: {
        username:"",
        profileImage:"",
        balance:"",
    },
    error_lock:0,
    message_lock:0,
    error: "",
    message: "",
    users : [],
    transactions : [],
    requests:[],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JWT:
            return {
                ...state,
                jwt: action.payload,
                isAuthenticated : "true",
                message: "Logged In Successfully",
                message_lock: 1,
            };
        case SET_JWT_ERROR:
            return {
                ...state,
                error: action.payload.error,
                error_lock: 1,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                loggedInUser:{
                    username: action.payload.username,
                    profileImage: action.payload.profile.image,
                    balance: action.payload.profile.balance,
                },
            };
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
                message_lock: 1,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                error_lock: 1,
            };
        case SET_MESSAGE_LOCK:
            return {
                ...state,
                message_lock: 0,
            };
        case SET_ERROR_LOCK:
            return {
               ...state,
                error_lock: 0,
            };
        case SET_REQUESTS:
            return {
                ...state,
                requests: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;