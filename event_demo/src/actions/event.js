import { EVENTADD_SUCCESS,EVENTADD_FAIL,GET_EVENTS, GETEVENT_BYID} from "./types";
import axios from 'axios'


export const addevent = ({eventName,eventDesc,region,categorie,selectedTime,eventImage}) => async dispatch => {
    
    const config = {
        headers : {
            'Content-Type' : 'application/json',
           
        }
    }

        const formData = new FormData()
        formData.append('imageUp',eventImage)
        try {
            const res1 = await axios.post ('http://localhost:4000/api/evenement/upload',formData,config); 
            const imgName=res1.data.fileName
            const imgPath= res1.data.filePath
            const body = JSON.stringify({eventName,eventDesc,region,categorie,selectedTime,imgName,imgPath});

            const res2 = await axios.post ('http://localhost:4000/api/evenement/add',body,config); 
        dispatch({
            type : EVENTADD_SUCCESS,
            payload : res2.data
        });
        
        } catch (err) {
           console.log('failed')
        }
        getEvents()
       
  
}

export const getEvents = () => async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'applciation/json'
        }
    }
    try {
        const res = await axios.get('http://localhost:4000/api/evenement/')
        dispatch ({
            type : GET_EVENTS,
            payload :res.data
        })
    } catch (err) {
        console.log('get', err)
    }

}

export const getEventbyID = (cardID) => async dispatch => {
    const config = {
        headers :{
            'Content-Type' : 'applciation/json'
        }
    }
    try {
        const res = await axios.get(`http://localhost:4000/api/evenement/${cardID}`)
        dispatch ({
            type : GETEVENT_BYID, 
            payload :res.data
        })
        console.log('from dispatch',res.data) 
    } catch (err) {
        console.log('get', err)
    }

}
