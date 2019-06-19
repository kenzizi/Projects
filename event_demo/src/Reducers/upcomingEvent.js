import { GETUPCOMINGEVENT } from "../actions/types";


const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case GETUPCOMINGEVENT:
        state=[]
        return state.concat(payload)
    default:
        return state
    }
}

