import React, { useState,Fragment } from "react";
import { login } from "../actions/auth";
import { connect } from "react-redux";
import { MDBInput } from "mdbreact";
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import Navbar from './navbar'

const LoginForm = ({ login,isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    password,
    email,
  } = formData;
  
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

      login({
        email,
        password,
      });
      console.log('karim',formData)
    
  }
//redirect if logged in 
if (isAuthenticated) {
  return <Redirect to="/" />
}
  return (
    <Fragment>
        <Navbar />

    <div className=" form-cc col-md-12">
      <h2>login</h2>

      <form
        className="form-horizontal d-flex row"
        onSubmit={e => onSubmit(e)}
        role="form"
      >
        <div className="form-left-section col-md-6">
     
        
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
          <button type="submit" className="btn btn-primary btn-block col-md-8">
            Login
          </button>
        </div>
        
      </form>
    </div>
    
    </Fragment>
  );
};
login.Prototypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,//mstp
  { login}
)(LoginForm);
