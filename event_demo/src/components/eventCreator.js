import React,{useState} from "react";
import Nabvar from "./navbar";
import { DatePicker } from "antd";
import { MDBInput } from "mdbreact";
import { Dropdown, Form } from "semantic-ui-react";
import {connect} from 'react-redux'
import {addevent} from '../actions/event'
import {withRouter} from 'react-router-dom'
const categoriesOptions = [
  { text: "Camping", key: "Camping", value: "Camping" },
  { text: "Dinner", key: "Dinner", value: "Dinner" },
  { text: "Jogging", key: "Jogging", value: "Jogging" },
  { text: "Meeting", key: "Meeting", value: "Meeting" }
];
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
const { RangePicker } = DatePicker;



 const EventCreator = ({addevent,auth,imge,history}) => {

  const [formData, setFormData] = useState({
    region: "",
    categorie:'',
    selectedTime :{},
    eventName:'',
    eventDesc:'',
    imgName:'Choose Image',
    eventImage:''
 
  });
  const [redirect,setRedirect] = useState(
    false
  )
  ;

  const {eventName,eventDesc,region,categorie,selectedTime,eventImage,imgName} = formData;

  
  const handleChangeRegion = (event, data) => {
    const { value } = data;
    setFormData({...formData,region:value})
  };

  const handleChangeCategorie = (event, data) => {
        const { value } = data;
       setFormData({...formData , categorie : value})
      };

  const changeTime = (value, dateString) => {
          
            setFormData({
              ...formData,
              selectedTime :{
                startDate: dateString[0].slice(0, 10),
                endDate: dateString[1].slice(0, 10),
                startHour: dateString[0].slice(10, 16),
                endHour: dateString[1].slice(10, 16)
              }
            })
          };
  const onSubmit = e => {
    e.preventDefault()

    addevent({eventName,eventDesc,region,categorie,selectedTime,eventImage})
    history.push("/events")
  }


  const handleUplaod = e => {
    setFormData({...formData,imgName:e.target.files[0].name,eventImage:e.target.files[0]})
    


  }


  
  const handleInputs = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div>
      <Nabvar />
      <div className="eventcreator-style-form">
      <div className="event-create-form-section ">
        <form onSubmit={e => onSubmit(e)} >
          <div className="event-create-form-items">
            <h3 className="create-event-title">Create event form</h3>
            <MDBInput name="eventName" label="Event name" size="lg" className="forminputs" onChange={handleInputs} />
            <MDBInput name="eventDesc" type="textarea" label="Description" rows="2"  onChange={handleInputs} className="forminputs"/>

            <RangePicker
              className="col-md-12 mt-4 range-picker .forminputs"
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["Start Time", "End Time"]}
              size="large"
              id="timeInterval"
              separator="-"
              onChange={changeTime}
              />
            <Dropdown
              className="col-md-12 mt-4 .forminputs"
              placeholder="Select Region"
              fluid
              search
              selection
              options = {countryOptions}
              onChange = {handleChangeRegion}
             
            />
            <Dropdown
              className="col-md-12 mt-4 mb-4 .forminputs"
              placeholder="Event Categorie"
              fluid
              search
              selection
              options = {categoriesOptions}
              onChange={handleChangeCategorie}
            />
            <div className="upload-container">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input .forminputs"
                id="customFile"
                onChange={handleUplaod}

              />
              <label
                className="custom-file-label"
                htmlFor="customFile"
              >
               {formData.imgName}
              </label>
            </div>
            
            <input
            type="submit"
            value="upload"
            className="btn btn-primary btn-block mt-4"
             />
          </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    imge:state.event
  }
}
const EventRouter = withRouter(EventCreator)
export default connect(mapStateToProps,{addevent})(EventRouter)