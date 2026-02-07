import "./CreateProfile.css";
import { useState } from "react";

export default function CreateProfile({ onClose }) {
    const [gender, setGender] = useState("");

    return (
        <div className="create-overlay" onClick={onClose}>
            <div
                className="create-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>✕</button>

                <h2 className="title">Create profile</h2>

                <form className="create-form">
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
                        <input type="text" placeholder="29th Aug 1995" />
                    </FormGroup>

                    <FormGroup label="Height">
                        <input type="text" placeholder="160 cm" />
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

                    <button type="button" className="create-btn">
                        Create profile
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
