import "./CSS/CreateProfile.css";
import "./CSS/Err.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setAccessToken, getAccessToken, displayErr } from "./clientSession.jsx";

const accessToken = getAccessToken();

const API_VERIFY_TOKEN = 'http://localhost:3000/verifyToken';
const API_LOGIN = 'http://localhost:3000/login';
const API_CREATE_PROFILE = 'http://localhost:4000/createProfile';

export default function RegisterProfile() {

    /** [ Helper Function ]
     * Verifies access token validity.
     * Redirects to login page if token is invalid or not found.
     */
    const verifyAccessToken = async () => {

        if(!accessToken){
            nav('/login');
        }
        else{
            try{
                //Payload.
                const res = await fetch(API_VERIFY_TOKEN, {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({ accessToken }),
                });
                const result = await res.json();

                if (!result.success) {
                    nav('/login');
                }
            }
            catch(err){"Error: CreateProfileFirst: verifyAccessToken: ", err.message}
        }
    }

    const nav = useNavigate()
    const navigate = () =>{
    nav('/home')
    };

    /** [ Feature Function ] 
    * Called when submitting form data.
    */
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const dataObject = Object.fromEntries(formData);

        sendDataToBackend(dataObject);
    }

    /** [ Backend Function ] 
     * Sends data to backend.
     * Handles late data entry errors.
     */
    const sendDataToBackend = async (data) => {
        try{
            /**
             * Steps:
             * 1. Create new profile with form data.
             * 2. Get full token.
             * 3. Navigate to home page.
             */

            //1. Create new profile with form data.
            const response = await fetch(API_CREATE_PROFILE, {
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
            body: JSON.stringify(data),
            });
            const result = await response.json();

            if(result.success){
                setAccessToken(result.accessToken);//2. Get full token.
                navigate();//3. Navigate to home page.
            }
            else displayErr('Error: Create profile failed!');
        }
        catch(err){"Error: Register: Register: ", err.message}
    };

    return (
        window.onload = verifyAccessToken(),

        <div className="create-profile-page">
            <div className="create-profile-card">

                {/* Title */}
                <h2 className="create-profile-title">Create Profile</h2>
                <p className="create-profile-subtitle">Please fill up your details</p>

                {/*Error Message Display.*/}
                <h3 id="err" className="err"></h3>

                {/* Form */}
                <form className="create-profile-form" onSubmit={handleSubmit}>

                    {/* Name */}
                    <FormGroup label="Name">
                        <input type="text" minLength={1} maxLength={30} placeholder="Olivia Brown" name="PROFILE" required/>
                    </FormGroup>

                    {/* Gender */}
                    <div className="form-group">
                        <label>Gender</label>

                        <div className="radio-group" required>
                            <label>
                                <input
                                    type="radio"
                                    name="GENDER"
                                    value="Male"
                                />
                                Male
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="GENDER"
                                    value="Female"
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* DOB */}
                    <FormGroup label="Date of Birth">
                        <input type="date" placeholder="YYYY-MM-DD" name="DOB" required/>
                    </FormGroup>

                    {/* Height */}
                    <FormGroup label="Height (Metres, m)">
                        <input type="number" min="0.01" max="3" step="0.01" placeholder="1.6" name="HEIGHT" required/>
                    </FormGroup>

                    {/* Weight */}
                    <FormGroup label="Weight (Kilograms, kg)">
                        <input type="number" min="0.1" step="0.1" placeholder="60" name="WEIGHT" required/>
                    </FormGroup>

                    {/* TOS */}
                    <div className="checkbox-group">
                        <input type="checkbox" />
                        <span>
                            I agree to Terms and Conditions and Privacy Policy
                        </span>
                    </div>
        
                    {/* Submit Button */}
                    <button type="submit" className="create-profile-btn">
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