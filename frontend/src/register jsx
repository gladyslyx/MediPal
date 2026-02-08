import React, { useState } from "react";
import "./Login.css";
// root component：login /login page
export default function Login() {
  // statu conterol：active recent tab（login/register）
  const [activeTab, setActiveTab] = useState("register");
  // statu control：register form default value（match UI example text）
  const [registerFormData, setRegisterFormData] = useState({
    FULLNAME: "Olivia Brown",
    EMAIL: "youremail@xmail.com",
    PASSWORD: "..............",
  });
  // statu control：agree terms checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);
  // statu control：login form default value
  const [loginFormData, setLoginFormData] = useState({
    EMAIL: "",
    PASSWORD: "",
  });
  // status control：remember  my checkbox
  const [rememberMe, setRememberMe] = useState(false);

  // switch label logic
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // register form submit logic
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to Terms and Conditions and Privacy Policy");
      return;
    }
    console.log("register and submit data：", registerFormData);
    // call backend rigister interface（can reuse original sendDataToBackend）
    sendDataToBackend(registerFormData, "register");
  };

  // login form submit logic
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("login to submit data：", loginFormData, "remember me：", rememberMe);
    sendDataToBackend(loginFormData, "login");
  };

  // sent message to backend
  const sendDataToBackend = async (data, type) => {
    try {
      const response = await fetch(`http://localhost:3000/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(`[${type}] backend respond：`, result);
    } catch (err) {
      console.log(`Error: ${type}`, err.message);
    }
  };

  // register form imput box logic change
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  // login form imput box logic change
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* label switch */}
        <Switcher
          activeTab={activeTab}
          handleTabSwitch={handleTabSwitch}
        />

        {/* title area（matchUI） */}
        <h1>{activeTab === "login" ? "Welcome Back" : "Create account"}</h1>
        <p className="subtitle">
          {activeTab === "login"
            ? "Sign in to continue your health journey"
            : "Begin your health journey today"}
        </p>

        {/* register form（match UI） */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            {/* full name imput box */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="FULLNAME"
                value={registerFormData.FULLNAME}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            {/* email imput box */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="EMAIL"
                value={registerFormData.EMAIL}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            {/* password (pin) input box */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="PASSWORD"
                value={registerFormData.PASSWORD}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            {/* agreement terms （matchUI） */}
            <div className="agree">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                required
              />
              <label>I agree to Terms and Conditions and Privacy Policy</label>
            </div>
            {/* register button（match UI） */}
            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>
        )}

        {/* login form */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="EMAIL"
                value={loginFormData.EMAIL}
                onChange={handleLoginInputChange}
                placeholder="youremail@mail.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="PASSWORD"
                value={loginFormData.PASSWORD}
                onChange={handleLoginInputChange}
                placeholder="********"
                required
              />
            </div>
            {/* remember/forget password (pin) */}
            <div className="form-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <span
                className="forgot"
                onClick={() => alert("skip to Retrieve password page")}
              >
                Forgot password?
              </span>
            </div>
            {/* login button */}
            <button type="submit" className="submit-btn">
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// label switching modle
function Switcher({ activeTab, handleTabSwitch }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === "login" ? "active" : ""}`}
        onClick={() => handleTabSwitch("login")}
      >
        Login
      </button>
      <button
        className={`tab ${activeTab === "register" ? "active" : ""}`}
        onClick={() => handleTabSwitch("register")}
      >
        Register
      </button>
    </div>
  );
}