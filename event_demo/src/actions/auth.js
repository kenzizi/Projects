import axios from 'axios';

import {REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT} from './types'
import setAuthToken from '../Utils/setAuthToken'


//LOAD USER 
export const loadUser = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('http://localhost:4000/api/auth'); 
        dispatch ({
            type:USER_LOADED,
            payload : res.data
        })

    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//register user 

export const register = ({name,lastname,email,password,gender,dateOfbirth,phoneNumber}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({name,lastname,email,password,gender,dateOfbirth,phoneNumber});
    
    try {
        const res = await axios.post ('http://localhost:4000/api/users',body,config); 

        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        });
        dispatch(loadUser)
    } catch (err) {
        dispatch ({
            type : REGISTER_FAIL
        });
    }
}

export const login = (email,password) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify(email,password);
    try {
        const res = await axios.post ('http://localhost:4000/api/auth',body,config); 

        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        });
        dispatch(loadUser)

    } catch (err) {
        dispatch ({
            type : LOGIN_FAIL
        });
    }
}


// LOG OUT 
export const logout = () => disptach => {
    disptach ({
        type: LOGOUT
    })
}


