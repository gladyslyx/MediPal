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

  //Handles form submit.
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);

    sendDataToBackend(dataObject);
  };

  //Sending data to backend. NOT DONE
  const sendDataToBackend = async (data) => {
    try{
      //Payload.
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Server Response: ', result);

      if (result == 1) {
        console.log("Success")
        navigate();
      }
      else alert("Wrong email or password!")

    }catch(err){"Error: Login: Login: ", err.message}
  };

  // status control：agree terms checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);

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
          name="PASSWORD"
          placeholder="******"
          required
          />
      </div>

      {/*Terms and Conditions*/}
      <div className="agree">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
          required
        />
        <label className="termscons">I agree to Terms and Conditions and Privacy Policy</label>
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
