import "./Login.css";

//<<<<<<Login Page>>>>>>: Handles and displays login page.
export default function Login(){
    return (
        <div className="login-page">
            <div className="login-card">

                {/*Call Switcher*/}
                <Switcher />

                {/*Message Division.*/}
                <h1>Welcome Back</h1>
                <p className="subtitle">Sign in to continue your health journey</p>

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
    return (
        <main>
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
            </main>
    );
}

//<<<<<<Form Handler>>>>>>
function Form() {

  //Handles form submit.
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);

    console.log(dataObject);

    //sendDataToBackend(dataObject);
  };

  //Sending data to backend. >>NOT READY.
  /*const sendDataToBackend = async (data) => {
    try{
      const response = await fetch('http://localhost:3000/update', {
        method: 'POST',
        headers:{'Content-Type': 'application/json',},
        body: JSON.stringify(data), 
      });

      const result = await response.json();
      console.log('Server Response: ', result);
    }catch(err){"Error: Login: Login: ", err.message}
  }*/

  //Returns HTML Body
  return (
    <main>

        {/*Form Handler.*/}
        <form name="form" onSubmit={handleSubmit}>     
            {/*Email Input*/}
            <div className="form-group">
                <label>Email</label>
                <input 
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
                name="password" 
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