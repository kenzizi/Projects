import {EVENTADD_SUCCESS,GET_EVENTS, EVENTADD_FAIL, GETEVENT_BYID,GETTODAYSEVENT,GETUPCOMINGEVENT} from '../actions/types'

const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {
    
    
    case EVENTADD_SUCCESS:
        return  [...state, payload ]
    case EVENTADD_FAIL:
        return state
    case GET_EVENTS:
    case GETTODAYSEVENT:
    case GETUPCOMINGEVENT:
        state = []
        return state.concat(payload)
    case GETEVENT_BYID : 
        state=[]
        return state.concat(payload)
    default:
        return state
    }
}
