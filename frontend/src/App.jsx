import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from "./Login.jsx"
import Register from './Register.jsx';
import RegisterProfile from "./CreateProfileFirst.jsx";
import Homepage from "./Homepage.jsx";
import UserProfile from "./UserProfile.jsx";
import ProfileSelection from "./ProfileSelection.jsx";
import MedHomepage from "./MedHomepage.jsx";
import MedReqAccess from "./MedReqAccess.jsx";
import BiomarkerPage from "./Biomarker.jsx";

//Web application runner.
function App() {

  return (
    <BrowserRouter>
    <Routes>

      {/* Index Path */}
      <Route index element={<Navigate to="/login" replace/>}/>

      {/* Login Page
          Index --> /login --> /home (if profile found)
                      |------> /firstProfile (if no profiles found)
      */}
      <Route path="/login" element={<Login/>}/>

      {/* Register Page
          /register --> /firstProfile
      */}
      <Route path='/register' element={<Register/>}/>

      {/* First Profile Creation Page
          /login ------> /firstProfile --> /home
          /register ----------| 
      */}
      <Route path='/firstProfile' element={<RegisterProfile/>}/>

      {/* Home Page
          /home --> /user
            |-----> /profile
      */}
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/user' element={<UserProfile/>}/>
      <Route path='/profile' element={<ProfileSelection/>}/>
      <Route path="/biomarker" element={<BiomarkerPage />} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;