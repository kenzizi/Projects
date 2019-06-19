import React,{useEffect} from "react";
import {connect} from 'react-redux'
import {getEventbyID} from '../../actions/event'
import store from '../../store'
const EventDetailInfo = ({cardID,event}) => {
  
  useEffect(() => {
    store.dispatch(getEventbyID(cardID))
  }, [] ) 
  console.log(event,"karim")
  let bg = event[0].imgPath;
  var sectionStyle = {
    backgroundImage: `url(${bg})`
  };
  return (
    <div className=" container">
      <div className="detail-container">
        <div className="detail-user-section">
          <img
            className="user-img"
            src={event[0].avatar}
            alt="pic"
          />
          <div>
            <h3 className="user-text-name">{event[0].name}</h3>
            <h3 className="user-text-mail">{event[0].userMail}</h3>
          </div>
        </div>
      </div>

      <div className="detail-card-section">
        <div className="style-details">
          <div className="detail-card-image-section" style ={sectionStyle} />
          <div className="detail-card-detail-section">
            <p className="detail-card-texts">{event[0].eventName}</p>
            <p className="detail-card-texts">{event[0].categorie}</p>
            <p className="detail-card-texts">{event[0].region}</p>
            <p className="detail-card-texts">{event[0].eventDesc} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    event : state.event
  }
}

export default connect(mapStateToProps,{getEventbyID})(EventDetailInfo);
