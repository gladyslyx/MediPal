// import "./CreateProfile.css";
// import { useState } from "react";

// export default function CreateProfile({ onClose }) {
//     const [gender, setGender] = useState("");

//     return (
//         <div className="create-overlay" onClick={onClose}>
//             <div
//                 className="create-card"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close-btn" onClick={onClose}>✕</button>

//                 <h2 className="title">Create profile</h2>

//                 <form className="create-form">
//                     <FormGroup label="Name">
//                         <input type="text" placeholder="Olivia Brown" />
//                     </FormGroup>

//                     <div className="form-group">
//                         <label>Gender</label>
//                         <div className="radio-group">
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Male"
//                                     onChange={() => setGender("Male")}
//                                 />
//                                 Male
//                             </label>

//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Female"
//                                     onChange={() => setGender("Female")}
//                                 />
//                                 Female
//                             </label>
//                         </div>
//                     </div>

//                     <FormGroup label="Date of Birth">
//                         <input type="text" placeholder="29th Aug 1995" />
//                     </FormGroup>

//                     <FormGroup label="Height">
//                         <input type="text" placeholder="160 cm" />
//                     </FormGroup>

//                     <FormGroup label="Weight">
//                         <input type="text" placeholder="57 kg" />
//                     </FormGroup>

//                     <div className="checkbox-group">
//                         <input type="checkbox" />
//                         <span>
//                             I agree to Terms and Conditions and Privacy Policy
//                         </span>
//                     </div>

//                     <button type="button" className="create-btn">
//                         Create profile
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// function FormGroup({ label, children }) {
//     return (
//         <div className="form-group">
//             <label>{label}</label>
//             {children}
//         </div>
//     );
// }


import "./CreateProfile.css";

export default function CreateProfile() {
    return (
        <div className="register-page">
            <div className="register-card">

                <h1>Create profile</h1>
                <p className="subtitle">Please fill up your details</p>

                {/* Name */}
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Olivia Brown"
                    />
                </div>

                {/* Gender */}
                <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-options">
                        <label>
                            <input type="radio" name="gender" /> Male
                        </label>

                        <label>
                            <input type="radio" name="gender" /> Female
                        </label>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        placeholder="29th Aug 1995"
                    />
                </div>

                {/* Height */}
                <div className="form-group">
                    <label>Height</label>
                    <input
                        type="text"
                        placeholder="160 cm"
                    />
                </div>

                {/* Weight */}
                <div className="form-group">
                    <label>Weight</label>
                    <input
                        type="text"
                        placeholder="57 kg"
                    />
                </div>

                {/* Terms */}
                <div className="terms">
                    <input type="checkbox" />
                    <span>I agree to Terms and Conditions and Privacy Policy</span>
                </div>

                {/* Button */}
                <button className="create-btn">
                    Create profile
                </button>

            </div>
        </div>
    );
}

import "./CreateProfile.css";
import { useState } from "react";

export default function CreateProfile() {
    const [gender, setGender] = useState("");

    return (
        <div className="create-profile-page">
            <div className="create-profile-card">

                <h2 className="create-profile-title">Create Profile</h2>
                <p className="create-profile-subtitle">Please fill up your details</p>

                <form className="create-profile-form">

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