import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import store from '../../store'
import {connect} from 'react-redux'
import {getEventbyID} from '../../actions/event'
 class TimetableCard extends Component {
    
    dispatcher = () => {
        //  console.log('hhhhhhhhhh',this.props.event)
         store.dispatch(getEventbyID(this.props.event._id), console.log('hi sarra'))
    }
    render() {
        const {event} = this.props
        console.log(event,"il id taa event")
       
        return (
       
            <div className="container">
            <div className="timetable-card-container">
            <div className="card-style">
            <p className="timetable-time-title">{event.time[0].startHour} am - {event.time[0].endHour} am</p>
            </div>
            <div className="card-style ">
            <img src={event.imgPath}  className="timetable-card-image" />
           
            </div>
            <div className="card-style flex-item">
            <p className="time-card-event-title">{event.eventName}</p>
            <p className="time-card-event-content">{event.eventDesc}</p>
            </div>
            <div className="card-style">
            <Link  onClick = {()=>{this.dispatcher()}} to ={`/eventdetails/${event._id}`}> Explore</Link>
            </div>
         </div>
            </div>
          
        )
    }
}
export default connect(null,{getEventbyID})(TimetableCard)