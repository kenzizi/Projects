import {combineReducers} from 'redux'
import auth from './auth'
import event from './event'
import todaysEvent from './todaysEvent'
import UpcomingEvent from './upcomingEvent'

export default combineReducers({
    auth,
    event,
    todaysEvent,
    UpcomingEvent

});