import React, { Component } from 'react'
import { Link} from 'react-router-dom'
class introduction extends Component {
    render() {
        return (
            <section className="section-intro  " >
            <div className="introduction-background col-md-12">
                <div className="wave-header-intro"></div>
                <div className="wave-header-intro-2"></div>

            </div>
            <div className="intro-content position-absolute col-lg-12">
            <p className="intro-parag">Find Search Create your own <span>Event</span></p>
            <Link to='/eventcreate' className="intro-buttons"> Create Event </Link>
            <Link to='/events' className="intro-buttons">  Explore Event </Link>
            </div>
                
            </section>
        )
    }
}
export default introduction
