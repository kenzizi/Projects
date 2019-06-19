import React, { Component,useEffect } from "react";
import Eventcard from "./eventCard";
import { DatePicker, List } from "antd";
import { Dropdown } from "semantic-ui-react";
import {getEvents} from '../../actions/event'
import {connect} from 'react-redux'


const countryOptions = [
  { text: "Ariana", key: "Ariana", value: "Ariana" },
  { text: "Béja", key: "Béja", value: "Béja" },
  { text: "Ben Arous", key: "Ben Arous", value: "Ben Arous" },
  { text: "Bizerte", key: "Bizerte", value: "Bizerte" },
  { text: "Gabès", key: "Gabès", value: "Gabès" },
  { text: "Gafsa", key: "Gafsa", value: "Gafsa" },
  { text: "Jendouba", key: "Jendouba", value: "Jendouba" },
  { text: "Kairouan", key: "Kairouan", value: "Kairouan" },
  { text: "Kasserine", key: "Kasserine", value: "Kasserine" },
  { text: "Kebili", key: "Kebili", value: "Kebili" },
  { text: "kef", key: "kef", value: "kef" },
  { text: "Mahdia", key: "Mahdia", value: "Mahdia" },
  { text: "Manouba", key: "Manouba", value: "Manouba" },
  { text: "Medenine", key: "Medenine", value: "Medenine" },
  { text: "Monastir", key: "", value: "" },
  { text: "Nabeul", key: "Nabeul", value: "Nabeul" },
  { text: "Sfax", key: "Sfax", value: "Sfax" },
  { text: "Sidi Bouzid", key: "Sidi Bouzid", value: "Sidi Bouzid" },
  { text: "Siliana", key: "Siliana", value: "Siliana" },
  { text: "Sousse", key: "Sousse", value: "Sousse" },
  { text: "Tataouine", key: "Tataouine", value: "Tataouine" },
  { text: "Tozeur", key: "Tozeur", value: "Tozeur" },
  { text: "Tunis", key: "Tunis", value: "Tunis" },
  { text: "Zaghouan", key: "Zaghouan", value: "Zaghouan" }
];
const categoriesOptions = [
  { text: "Camping", key: "Camping", value: "Camping" },
  { text: "Dinner", key: "Dinner", value: "Dinner" },
  { text: "Jogging", key: "Jogging", value: "Jogging" },
  { text: "Meeting", key: "Meeting", value: "Meeting" },
  { text: "Coding", key: "Coding", value: "Coding" }
];
const { RangePicker } = DatePicker;

class avaiblableEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slectedTime: {},
      selectedRegion: "Tunis",
     
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  changeTime = (value, dateString) => {
    this.setState({
      slectedTime: {
        startdate: dateString[0].slice(0, 10),
        endDate: dateString[1].slice(0, 10),
        startTime: dateString[0].slice(10, 16),
        endTime: dateString[1].slice(10, 16)
      }
    });
  };
  handleChange = (event, data) => {
    const { value } = data;
    const { text } = data.options.find(o => o.value === value);
    console.log(text);
    console.log(value);
    this.setState({
      selectedRegion: text
    });
  };
  componentWillMount = () => {
    this.props.getEvents()
    console.log('karim')
  }
  // componentWillUpdate = () => {
  //   console.log("componentWillUpdate")
  //   this.props.getEvents()
  // }

  render() {
    console.log('zied')
    const { eventList} = this.props
    return (
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <div className="row filters">
              <div className="col-md-12">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search by name"
                />
                <RangePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={["Start Time", "End Time"]}
                  onChange={this.changeTime}
                  id="timeInterval"
                  style={{ width: "390px" }}
                  className="mt-4"
                />
                <Dropdown
                  className="col-md-12 mt-4"
                  placeholder="Select Region"
                  fluid
                  search
                  selection
                  options={countryOptions}
                  onChange={this.handleChange}
                />
                <Dropdown
                  className="col-md-12 mt-4"
                  placeholder="Event Categorie"
                  fluid
                  search
                  selection
                  options={categoriesOptions}
                  onChange={this.handleChangeCategorie}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="cards-list row">
              <List
                className="col-md-12"
                itemLayout="horizontal"
                dataSource={eventList}
                pagination={{
                  onChange: page => console.log(page),
                  pageSize: 6
                }}
                renderItem={item => (
                    <Eventcard className="col-md-4" tab={item} />
                )}
              />
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    eventList : state.event
  }
}

export default connect(mapStateToProps,{getEvents})(avaiblableEvents);
