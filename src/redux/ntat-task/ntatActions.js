import {SET_JWT,SET_JWT_ERROR,SET_CURRENT_USER,SET_TRANSACTIONS,SET_USERS,SET_MESSAGE,SET_ERROR,SET_REQUESTS,SET_ERROR_LOCK,SET_MESSAGE_LOCK} from "./ntatTypes";
import store from '../store';
import axios from "axios";

const url = "http://localhost:8080";

const setJwt = ({jwt}) => {
    return {
        type: SET_JWT,
        payload: jwt,
    };
}

const setJwtError = ({data}) => {
    return {
        type: SET_JWT_ERROR,
        payload: data,
    };
}

const setCurrentUser = (data) => {
    return {
        type: SET_CURRENT_USER,
        payload: data,
    };
}

const setTransactions = (data) => {
    return {
        type: SET_TRANSACTIONS,
        payload: data,
    };
}

const setUsers = (data) => {
    return {
        type: SET_USERS,
        payload: data,
    };
}

const setMessage = (data) => {
    return {
        type: SET_MESSAGE,
        payload: data,
    };
}

const setError = (data) => {
    return {
        type: SET_ERROR,
        payload: data,
    };
}

export const setMessageLock = (data) => {
    return {
        type: SET_MESSAGE_LOCK,
        payload: data,
    };
}

export const setErrorLock = (data) => {
    return {
        type: SET_ERROR_LOCK,
        payload: data,
    };
}

const setRequests = (data) => {
    return {
        type: SET_REQUESTS,
        payload: data,
    };
}

export const fetchCurrentUser = () => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };    
    return function(dispatch) {
        return axios.get(url+"/current_user",{headers})
            .then(({data}) => {
                dispatch(setCurrentUser(data));
            })
    }
}

export const fetchTransactions = () => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };
    return function(dispatch) {
        return axios.get(url+"/transactions",{headers})
        .then(({data}) => {
            dispatch(setTransactions(data));
        })
    }
}

const fetchUsers = () => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };
    return function(dispatch) {
        return axios.get(url+"/users",{headers})
        .then(({data}) => {
            dispatch(setUsers(data));
        })
    }
}

export const fetchJwt = (data) => {
    return function(dispatch) {
        return axios.post(url+"/authenticate",data)
            .then(({data}) => {
                dispatch(setJwt(data));
                dispatch(fetchCurrentUser());
                dispatch(fetchTransactions());
                dispatch(fetchUsers());
                dispatch(fetchRequests());
            })
            .catch((error) => {
                dispatch(setJwtError(error.response));
            })
    };
}

export const fetchRequests = () => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };
    return function(dispatch) {
        return axios.get(url+"/get_requests",{headers})
            .then(({data}) => {
                dispatch(setRequests(data));
            })
    }
}

export const makeMoneyRequest = (data) => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };
    return function(dispatch) {
        return axios.post(url+"/request_money",data,{headers})
            .then(({data}) => {
                dispatch(setMessage(data.message));
            })
            .catch((error) => {
                dispatch(setError(data.message));
            })
    }
}

const makeTransaction = (data) => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`
    };
    return function(dispatch){
        return axios.post(url+"/transfer",data,{headers})
            .then(({data}) => {
                dispatch(setMessage("Transaction:-"+data.transactionId+" Successful"))
            })
            .catch((error) => {
                dispatch(setError(error.response))
            })
        }
    }

export const validateUpiAndMakeTransaction = (pin,details) => {
    let headers = {
        'Authorization': `Bearer ${store.getState().jwt}`,
    };
    return function(dispatch) {
        return axios.post(url+"/check_upi",pin,{headers})
            .then(({data}) => {
                dispatch(setMessage("UPI PIN is valid"));
                dispatch(makeTransaction(details));
            })
            .catch((error) => {
                dispatch(setError("UPI PIN Invalid"));
            })
    }
} 