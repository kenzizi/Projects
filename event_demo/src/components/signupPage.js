import React from "react";
import Navbar from "./navbar";
import SignupForm from "./signupComponents/signupForm";


const signupPage  =() =>  {
  
    return (
      <div>
        <Navbar />
        <div className="signup-section">
          <div className="row tessss">
            <SignupForm />
          
          </div>
        </div>
      </div>
    );
  
}



export default signupPage;
