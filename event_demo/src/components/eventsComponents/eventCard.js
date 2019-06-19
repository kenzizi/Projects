import React, { Component } from "react";
import { Avatar } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
class EventCard extends Component {
  // http://localhost:4000/api/evenement
  render() {
    const { tab, user } = this.props;
    let bg = tab.imgPath;
    var sectionStyle = {
      backgroundImage: `url(${bg})`
    };


    axios.post()
    return (
      <div className="col-md-4 col-lg-4 col-sm-6 flex mt-4">
        <div className="event-card-container" style={sectionStyle}>
          <div className="row event-card-header">
            <div className="col-md-1 col-sm-12" />
            <div className="col-md-6 col-sm-12" />
            <div className="col-md-5 col-sm-12">
              <span className="event-card-time">
                {tab.time.startHour} - {tab.time.endHour}
              </span>
            </div>
          </div>
          <div className="event-card-user d-flex justify-content-around">
            <div className="d-flex align-items-center">
              <Avatar src={tab.avatar} />
              <p className="event-card-username"> {tab.name} </p>
            </div>
            <div className="d-flex align-items-center">
              <Avatar style={{ backgroundColor: "#87d068" }}>E</Avatar>
              <p className="event-card-username"> {tab.categorie} </p>
            </div>
          </div>
          <Link to ={`/eventdetails/${tab._id}`}>
            <div className="event-card-hover">
              <div className="event-card-info">
                <img
                  src={tab.avatar}
                  className="user-avatar-card"
                  alt="pic area"
                />

                <p className="event-card-user-hover">{tab.name}</p>
                <p className="event-card-user-hover">{tab.eventDesc}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(EventCard);
