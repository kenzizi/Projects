import {combineReducers} from 'redux'
import auth from './auth'
import event from './event'
import Todays from './Todays'
import Upcoming from './Upcoming'


export default combineReducers({
    auth,
    event,
    Todays,
    Upcoming
});