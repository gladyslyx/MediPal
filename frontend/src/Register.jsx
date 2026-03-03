import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

//<<<<<<Register Page>>>>>>: Handles and displays register page.
export default function Register() {
  return (
    <div className="login-page">
      <div className="login-card">
        {/*Call Switcher*/}
        <Switcher />

        {/*Message Division.*/}
        <h1>Create account</h1>
        <p className="subtitle">Begin your health journey today.</p>

        {/*Call Form*/}
        <Form />

      </div>
    </div> 
  );
}

//<<<<<<Switcher Handler>>>>>>
function Switcher() {
  const nav = useNavigate()
  const navigate = () =>{
    nav('/login')
  };

  return (
    <main>
      <div className="tabs">
        {/*Login Switcher*/}
        <button
          className="tab"
          onClick={navigate}
        >
          Login
        </button>

        {/*Register Switcher*/}
        <button
          className="tab active"
        >
          Register
        </button>
      </div>
    </main>
    );
}

//<<<<<<Form Handler>>>>>>
function Form(){

  const nav = useNavigate()
  const navigate = () =>{
    nav('/home')
  };

  //Handles form submit.
  const handleSubmit = (event) => {
    event.preventDefault();

    var pass1 = document.getElementById("firstPass").value
    var pass2 = document.getElementById("reenterPass").value

    if(pass1 === pass2){
      if(pass1.length >= 8){
        const formData = new FormData(event.target);
        const dataObject = Object.fromEntries(formData);

        sendDataToBackend(dataObject);
      }
      else alert("Password must be 8 characters or longer!");
    }
    else alert("Password is not the same!");
    }

  //Sending data to backend.
  const sendDataToBackend = async (data) => {
    try{
      //Payload.
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result == 1) {
        console.log("Success")
        navigate();
      }
      else alert("Email has already been registered!");

    }catch(err){"Error: Register: Register: ", err.message}
  };

//HTML Body.
return(
<main>
  {/*Form Handler*/}
  <form onSubmit={handleSubmit}>

    {/*Email Input*/}
    <div className="form-group">
      <label>Email</label>
        <input
          name="EMAIL"
          placeholder="youremail@mail.com"
          required
        />
    </div>

    {/*Password Input*/}
    <div className="form-group">
        <label>Password</label>
          <input
          id="firstPass"
          name="PASSWORD"
          placeholder="******"
          required
          />
    </div>

    {/*Re-enter Password Input*/}
    <div className="form-group">
        <label>Confirm Password</label>
          <input
          id="reenterPass"
          placeholder="******"
          required
          />
    </div>

    {/*Submit Button*/}
    <button type="submit" className="submit-btn">
        Create Account
    </button>
    
  {/*Form End*/}
  </form>
</main>
);
}
