import "./CSS/CreateProfile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./clientSession.jsx";

const API_REGISTER = 'http://localhost:3000/register';
const API_CREATE_PROFILE = 'http://localhost:4000/createProfile';

//Data from register page.
const dataReg = localStorage.getItem('data');

export default function registerProfile() {

    const [gender, setGender] = useState("");

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

    }

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
    const sendDataToBackend = async (dataProf) => {
        try{
            //Payload.
            const res1 = await fetch(API_REGISTER, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(dataReg),
            });
            const resultReg = await res1.json();

            //Get dummy token from register response.
            //Used to complete create profile request.
            const accessToken = resultReg.dummyToken;

            //Payload.
            const response = await fetch(API_CREATE_PROFILE, {
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
            body: JSON.stringify(dataProf),
            });
            const result = await response.json();

        }
        catch(err){"Error: Register: Register: ", err.message}
    };

    return (
        <div className="create-profile-page">
            <div className="create-profile-card">

                <h2 className="create-profile-title">Create Profile</h2>
                <p className="create-profile-subtitle">Please fill up your details</p>

                <form className="create-profile-form" onSubmit={handleSubmit}>

                    <FormGroup label="Name">
                        <input type="text" placeholder="Olivia Brown" />
                    </FormGroup>

                    <div className="form-group">
                        <label>Gender</label>

                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={() => setGender("Male")}
                                />
                                Male
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={() => setGender("Female")}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <FormGroup label="Date of Birth">
                        <input type="text" placeholder="YYYY-MM-DD" />
                    </FormGroup>

                    <FormGroup label="Height">
                        <input type="text" placeholder="1.6 m" />
                    </FormGroup>

                    <FormGroup label="Weight">
                        <input type="text" placeholder="57 kg" />
                    </FormGroup>

                    <div className="checkbox-group">
                        <input type="checkbox" />
                        <span>
                            I agree to Terms and Conditions and Privacy Policy
                        </span>
                    </div>

                    <button type="button" className="create-profile-btn">
                        Create Profile
                    </button>

                </form>
            </div>
        </div>
    );
}

function FormGroup({ label, children }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            {children}
        </div>
    );
}