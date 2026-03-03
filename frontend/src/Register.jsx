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

  /** [ Helper Function ] 
   * Displays error message on the form.
  */
  const displayErr = (msg) =>{
    var err = document.getElementById("err");
    err.textContent = msg;
    err.style.display = 'inline';
  };

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
  const navigate = () =>{
    nav('/home')
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
      //Validation Payload.
      const response = await fetch('http://localhost:3000/authorise', {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result == 1) {
        console.log("Email was found.")
        displayErr("Email has already been registered!")
      }
      else{

        //Real Payload.
        const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result == 1) {
        console.log("Email was registered.")
        navigate();
        }

      }

    }catch(err){"Error: Register: Register: ", err.message}
  };

//HTML Body.
return(
<main>
  {/*Form Handler*/}
  <form onSubmit={handleSubmit}>

    {/*Error Message Display.*/}
    <span id="err" className="err"></span>

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
