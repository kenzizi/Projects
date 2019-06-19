import React, { Component,useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import TimetableCard from './timetableCard'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import store from '../../store'
import  {getTodaysEvents} from '../../actions/todaysEvent'
import  {getUpcomingEvents} from '../../actions/UpcomingEvent'





 const Timetable =({todaysEvents,upEvents}) => {
    const [affiche,setAffiche]=useState(true)
    useEffect(() => {
        store.dispatch(getTodaysEvents())
      }, [] ) 


      console.log('mokhles',upEvents)

    const  showToday = () => {
        setAffiche(true)
      }
      const  showComing = () => {
        store.dispatch(getUpcomingEvents())
        setAffiche(false)
      }
        return (
            <div className="row">
            <div className="container timetable-section">
               <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link timetable-link" to='/' onClick={showToday} >Today's Event </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link timetable-link" to='/'  onClick={showComing} >Up coming events</Link>
                </li>
               
                </ul>
               </div>
               <div className="timetable-cards-section container">
                 {affiche?todaysEvents.map((el,i) => {
                    return <TimetableCard key={i} event = {el} />
                }):upEvents.map((el,i) => {
                    return <TimetableCard key={i}  event = {el} />
                }) }
             
              
       
                
               </div>

            </div>
          
        )
    }


Timetable.propTypes={
    todaysEvents:propTypes.array.isRequired
}

const mapStateToProps = state => ({
    todaysEvents:state.todaysEvent,
    upEvents:state.UpcomingEvent
});

export default connect(mapStateToProps,{getTodaysEvents,getUpcomingEvents}) (Timetable)
