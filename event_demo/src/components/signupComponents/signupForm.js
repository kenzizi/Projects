import React, { useState } from "react";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import { MDBInput } from "mdbreact";
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'


const Signupform = ({ register,isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dateOfbirth: "",
    phoneNumber: "",
    gender: ""
  });
  const {
    name,
    lastname,
    dateOfbirth,
    password,
    passwordConfirm,
    email,
    gender,
    phoneNumber,
  } = formData;

  
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("password dont match");
    } else {
      register({
        name,
        lastname,
        email,
        password,
        gender,
        dateOfbirth,
        phoneNumber
      });
 
    }
  };
  //redirect if logged in 
if (isAuthenticated) {
  return <Redirect to="/" />
}

  return (
    <div className=" form-cc col-md-12">
      <h2>Registration</h2>
      <form
        className="form-horizontal d-flex row"
        onSubmit={e => onSubmit(e)}
        role="form"
      >
        <div className="form-left-section col-md-6">
          <div className="form-group">
         
            <div className="col-sm-9">
              <MDBInput
                name="name"
                value={name}
                onChange={e => onChange(e)}
                label="Name"
              />
            </div>
          </div>
          <div className="form-group">
          
            <div className="col-sm-9">
              <MDBInput
                name="lastname"
                value={lastname}
                onChange={e => onChange(e)}
                label="Lastname"
              />
            </div>
          </div>
          <div className="form-group">
      
            <div className="col-sm-9">
              <MDBInput
                hint="Your e-mail"
                type="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
           
            <div className="col-sm-9">
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
           
            <div className="col-sm-9">
              <MDBInput
                label="Confirm your password"
                icon="lock"
                group
                type="password"
                validate
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="form-right-section col-md-6">
          <div className="form-group">
            
            <div className="col-sm-9">
              <input
                type="date"
                id="birthDate"
                className="form-control"
                name="dateOfbirth"
                value={dateOfbirth}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
           
            <div className="col-sm-9">
              <MDBInput
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={e => onChange(e)}
                label="Phone Number"
              />
            
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3">Gender</label>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-4">
                  <label className="radio-inline">
                    <input
                      type="radio"
                      id="femaleRadio"
                      value="Female"
                      name="gender"
                      onChange={e => onChange(e)}
                    />
                    Female
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="radio-inline">
                    <input
                      type="radio"
                      id="maleRadio"
                      value="Male"
                      name="gender"
                      onChange={e => onChange(e)}
                    />{" "}
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block col-md-8">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
register.PropTypes = {
  register : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,

  
}
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})
export default connect(
  mapStateToProps,
  { register }
)(Signupform);
