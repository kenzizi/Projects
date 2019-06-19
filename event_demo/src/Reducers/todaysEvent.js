import { GETTODAYSEVENT } from "../actions/types";


const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case GETTODAYSEVENT:
        state=[]
        return state.concat(payload)
    default:
        return state
    }
}