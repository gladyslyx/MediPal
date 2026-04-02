import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CSS/LoginRegister.css";
import "./CSS/Err.css";
import { setAccessToken, displayErr } from "./clientSession.jsx";

const REGISTER_PAGE = '/register';
const CREATE_PROFILE_PAGE = '/firstProfile';
const HOME_PAGE = '/home';
const MED_HOME_PAGE = '/medhome';

const API_LOGIN = 'http://localhost:3000/login';

//<<<<<<Login Page>>>>>> 
export default function Login() {
  const [role, setRole] = useState("user");

  return (
    <div className="login-page">
      <div className="login-card">

        <Switcher />

        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to continue your health journey</p>

        <h3 id="err" className="err"></h3>

        {/* ROLE SWITCH */}
        <div className="role-switch">
          <button
            type="button"
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            type="button"
            className={`role-btn ${role === "medical" ? "active" : ""}`}
            onClick={() => setRole("medical")}
          >
            Medical Provider
          </button>
        </div>

        <Form role={role} />

        <Checkbox />
      </div>
    </div>
  );
}

//<<<<<<Switcher Handler>>>>>>
function Switcher() {
  const nav = useNavigate();

  return (
    <main>
      <div className="tabs">
        <button className="switch tab active">
          Login
        </button>

        <button
          className="switch tab"
          onClick={() => nav(REGISTER_PAGE)}
        >
          Register
        </button>
      </div>
    </main>
  );
}

//<<<<<<Form Handler>>>>>>
function Form({ role }) {

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);
    sendDataToBackend(dataObject);
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {

        setAccessToken(result.accessToken);

        // 🔥 FIXED LOGIC HERE
        if (role === "medical") {
          // ALWAYS go med homepage
          nav(MED_HOME_PAGE);
        } else {
          // USER FLOW
          if (result.isHalf) {
            nav(CREATE_PROFILE_PAGE);
          } else {
            nav(HOME_PAGE);
          }
        }

      } else if (response.status === 401) {
        displayErr("Wrong email or password.");
      } else {
        displayErr("Error: Login failed!");
      }

    } catch (err) {
      console.error("Login error:", err);
      displayErr("Server error.");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>

        <div id="err" className="err"></div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="EMAIL"
            type="email"
            placeholder="youremail@mail.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="PASSWORD"
            type="password"
            placeholder="********"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Log In
        </button>

      </form>
    </main>
  );
}

//<<<<<<Checkbox Handler>>>>>>
function Checkbox() {
  return (
    <main>
      <div className="form-options">
        <label className="remember">
          <input type="checkbox" />
          Remember me
        </label>
        <span className="forgot">Forgot password?</span>
      </div>
    </main>
  );
}