import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

const API_LOGIN = 'http://localhost:3000/login ';

//<<<<<<Login Page>>>>>>: Handles and displays login page.
export default function Login(){
  return (
    <div className="login-page">
      <div className="login-card">
        {/*Call Switcher*/}
        <Switcher />

        {/*Message Division.*/}
        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to continue your health journey</p>

        {/*Call Form*/}
        <Form />

        {/*Call Checkbox*/}
        <Checkbox />
      </div>
    </div> 
  );
}

//<<<<<<Switcher Handler>>>>>>
function Switcher() {
  
  const nav = useNavigate()
  const navigate = () =>{
    nav('/register')
  };

  return (
    <main>
      <div className="tabs">
        {/*Login Switcher*/}
        <button
          className="tab active"
        >
          Login
        </button>

        {/*Register Switcher*/}
        <button
          className="tab"
          onClick={navigate}
        >
          Register
        </button>
      </div>
    </main>
    );
}

//<<<<<<Form Handler>>>>>>
function Form() {
  
  const nav = useNavigate()
  const navigate = () =>{
    nav('/home')
  };

  /** [ Feature Function ] 
   * Displays error message on the form.
  */
  const displayErr = (msg) =>{
    var err = document.getElementById("err")
    err.textContent = msg;
    err.style.display = 'inline';
  };

  /** [ Feature Function ] 
   * Called when submitting form data.
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);

    sendDataToBackend(dataObject);
  };

  /** [ Backend Function ] 
   * Sends data to backend.
   * Handles late data entry errors.
  */
  const sendDataToBackend = async (data) => {
    try{
      //Payload.
      const response = await fetch(API_LOGIN, {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });
      const result = await response.json();

      //Check response.
      if (result.success) {
        console.log('Status: ',result.status);
        navigate();
      }
      else if (!result.success && response.status == 401) { 
        console.log('Status: ',result.status);
        displayErr("Wrong email or password.");
      }
      else displayErr("Error: Login failed!");

    }catch(err){"Error: Login: Login: ", err.message}
  };

  //Returns HTML Body
  return (
    <main>
      {/*Form Handler.*/}
      <form name="form" onSubmit={handleSubmit}>     

        {/*Error Message Display.*/}
        <span id="err" className="err"></span>

        {/*Email Input*/}
        <div className="form-group">
          <label>Email</label>
          <input 
            name="EMAIL"
            type="email"
            placeholder="youremail@mail.com"
            required
            />
        </div>

        {/*Password Input.*/}
        <div className="form-group">
          <label>Password</label>
            <input 
              name="PASSWORD" 
              type="password"
              placeholder="********"
              required
              />
        </div>

        {/*Submit button.*/}
        <button type="submit" className="submit-btn"> Log In </button>

      {/*End of form*/}
      </form>
    </main>
  );
}

//<<<<<<Checkbox Handler>>>>>>
function Checkbox() {
  return (
    <main>
      {/*Remember Me Checkbox + Forgot Password. Incomplete.*/}
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