import React, { Component } from 'react'
import logo from '../../images/LOGO.jpeg'
 class sponsors extends Component {
    render() {
        return (
            <div className="sponsors-section">
            <p className="sponsors-section-title"> Sponsors : </p>
             <div className="row">
                <div className="col-lg-4 col-md-4 sponsors-text">
                   
                </div>
                <div className="col-lg-6 col-md-12">
                 <img className="sponsors-logos" src={logo} />  
                
                </div>
             </div>
            </div>
        )
    }
}
export default sponsors
