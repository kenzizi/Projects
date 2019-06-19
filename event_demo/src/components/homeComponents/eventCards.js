import React, { Component } from "react";
import "../../someComponents.css";
import {Link} from 'react-router-dom'


class eventCards extends Component {
 
  render() {
    const categorie = this.props.categorie
    console.log("seze",categorie)

    return (
      <div className="col-lg-4 col-md-4 col-sm-12">
      
        <div className="card-container">
          <img src={categorie.img_url}  className="card-img" />
          <div className="card-content">
            <p className="event-title">{categorie.cat_name}</p>
            <Link to ="/" className="card-link"><i class="material-icons home-info">info </i></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default eventCards;
