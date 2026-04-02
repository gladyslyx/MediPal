import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login.jsx";
import Register from './Register.jsx';
import RegisterProfile from "./CreateProfileFirst.jsx";
import Homepage from "./Homepage.jsx";
import BiomarkerPage from "./Biomarker.jsx";
import MedHomepage from "./MedHomepage.jsx";
import MedReqAccess from "./MedReqAccess.jsx";
import UserProfile from "./UserProfile.jsx";
import ProfileSelection from "./ProfileSelection.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route index element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Profile */}
        <Route path="/firstProfile" element={<RegisterProfile />} />

        {/* USER FLOW */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/profile" element={<ProfileSelection />} />
        <Route path="/biomarker" element={<BiomarkerPage />} />

        {/* MEDICAL PROVIDER FLOW */}
        <Route path="/medhome" element={<MedHomepage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;