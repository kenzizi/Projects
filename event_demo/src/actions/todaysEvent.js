import { GETTODAYSEVENT } from "./types";
import axios from 'axios'



export const getTodaysEvents = () => async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.get('http://localhost:4000/api/evenement/todays')
        dispatch ({
            type : GETTODAYSEVENT,
            payload :res.data
        })
        console.log('function did update')
    } catch (err) {
        console.log('get', err)
    }

}

