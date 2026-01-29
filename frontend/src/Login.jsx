import React from "react";
import "./Login.css";
import {handleSubmit, handleTabSwitch} from "./Login.js";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="tabs">
          <button
            className="tab active"
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className="tab"
            onClick={() => handleTabSwitch("register")}
          >
            Register
          </button>
        </div>

        <h1>Welcome Back</h1>
        <p className="subtitle">
          Sign in to continue your health journey
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="youremail@mail.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;