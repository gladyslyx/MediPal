import React from "react";
import "./Login.css";
import {loginForm, handleTabSwitch} from "./Login.js";

//Login page element: Handles and displays login page.
function Login() {
  return (

   
    <div className="login-page">
      <div className="login-card">
        <div className="tabs">

          {/*Login Switcher*/}
          <button
            className="tab active"
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>

          {/*Register Switcher*/}
          <button
            className="tab"
            onClick={() => handleTabSwitch("register")}
          >
            Register
          </button>
        </div>

        {/*Message Division.*/}
        <h1>Welcome Back</h1>
        <p className="subtitle">
          Sign in to continue your health journey
        </p>

        {/*Form Handler: User input interface.*/}
        <form id="loginForm" onSubmit={loginForm}>

          {/*Email Input*/}
          <div className="form-group">
            <label>Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              placeholder="youremail@mail.com"
              required
            />
          </div>

          {/*Password Input.*/}
          <div className="form-group">
            <label>Password</label>
            <input 
              id="password" 
              name="password" 
              type="password"
              placeholder="********"
              required
            />
          </div>

          {/*Submit button.*/}
          <button type="submit"> Log In </button>

          {/*End of form*/}
        </form>

        {/*Remember Me Checkbox. Incomplete.*/}
        <div className="form-options">
          <label className="remember">
            <input type="checkbox" />
            Remember me
          </label>
          <span className="forgot">Forgot password?</span>
        </div>
      </div>
    </div>
  );
}

export default Login;