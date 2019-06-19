import { GETUPCOMINGEVENT } from "./types";
import axios from 'axios'



export const getUpcomingEvents = () => async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.get('http://localhost:4000/api/upcomingevents/all')
        dispatch ({
            type : GETUPCOMINGEVENT ,
            payload :res.data
        })
        console.log('function did update')
    } catch (err) {
        console.log('get', err)
    }

}

