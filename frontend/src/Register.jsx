import { useNavigate } from "react-router-dom";
import "./CSS/LoginRegister.css";
import "./CSS/Err.css";
import { setAccessToken, displayErr } from"./clientSession.jsx";

const CREATE_PROFILE_PAGE = '/firstProfile';
const LOGIN_PAGE = '/login';

const API_REGISTER = 'http://localhost:3000/register';
const API_LOGIN = 'http://localhost:3000/login';

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

        {/*Error Message Display.*/}
        <h3 id="err" className="err"></h3>

        {/*Call Form*/}
        <Form />

      </div>
    </div> 
  );
}

//<<<<<<Switcher Handler>>>>>>
function Switcher() {
  const nav = useNavigate()
  const navigateToLogin = () =>{
    nav(LOGIN_PAGE)
  };

  return (
    <main>
      <div className="tabs">
        {/*Login Switcher*/}
        <button
          className="tab"
          onClick={navigateToLogin}
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

  /**[ Helper Function ]
   * Validates data entry.
   * Handles early data entry errors.
   */
  const validateFormData = () => {

    var pass1 = document.getElementById("firstPass").value
    var pass2 = document.getElementById("reenterPass").value

    //Checks if password is atleast 8 characters long.
      if(pass1.length >= 8){
        
        //Checks if password is the same as confirm password.
        if(pass1 === pass2) return 1; //Success
        else{ 
          displayErr("Password is not the same!"); // Failure
          return 0;
        }
      }
      else{
      displayErr("Password must be 8 characters or longer!"); //Failure
      return 0;
      }
  }

  /** [ Feature Function ] 
  * Holds navigation address.
  */
  const nav = useNavigate()
  const navigateToCreateProfile = () =>{
    nav(CREATE_PROFILE_PAGE)
  };

  /** [ Feature Function ] 
   * Called when submitting form data.
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    if(validateFormData() == 1){
      const formData = new FormData(event.target);
      const dataObject = Object.fromEntries(formData);

      sendDataToBackend(dataObject);
    }
  }

  /** [ Backend Function ] 
   * Sends data to backend.
   * Handles late data entry errors.
  */
  const sendDataToBackend = async (data) => {
    try{
      /**
       * Steps:
       * 1. Register account with email and password.
       * 2. Login to get half token for create profile request.
       * 3. Navigate to first profile registry page with access token.
       */

        //1. Registering account.
        const resReg = await fetch(API_REGISTER, {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
        });
        const resultReg = await resReg.json();

        //1. Check response.
        if (resultReg.success) {

          //2. Login to get access token for create profile request.
          const resLog = await fetch(API_LOGIN, {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(data),
          });
          const resultLog = await resLog.json();

          //3. Navigate to first profile registry page with access token.
          setAccessToken(resultLog.accessToken);
          navigateToCreateProfile();
        }
        //Failure
        else if (!resultReg.success && resReg.status == 409)
          displayErr("Email already exists!"); //Conflict: Email already exists.
        else displayErr("Error: Registration failed!");
      }
      catch(err){"Error: Register: Register: ", err.message}
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
          type="password"
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
          type="password"
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
