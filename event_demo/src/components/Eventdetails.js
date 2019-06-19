import React from 'react'
import Navbar from './navbar'
import EventDetailInfo from './eventDetailsComponents/eventDetailInfo'
 const Eventdetails = (props) => {
     console.log('mememememe',props.id)
    return (
        <div>
        <Navbar />
        <div className="eventdetails-main-container"></div>
        <EventDetailInfo cardID = {props.id} />
        </div>
    )
}

export default Eventdetails
