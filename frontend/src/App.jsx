import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import "./App.css";
import Login from "./Login.jsx"
import Register from './Register.jsx';
import Homepage from "./Homepage.jsx";
import UserProfile from "./UserProfile.jsx";
import ProfileSelection from "./ProfileSelection.jsx";
import CreateProfile from "./CreateProfile.jsx";

//Web application runner.
function App() {

  return (
    <BrowserRouter>
    <Routes>

      {/* Index Path */}
      <Route index element={<Navigate to="/login" replace/>}/>

      {/*Src: Is Origin. Dest: Home, Register.*/}
      <Route path="/login" element={<Login/>}/>

      {/*Src: Login. Dest: Login. */}
      <Route path='/register' element={<Register/>}/>

      {/*Src: Login. Dest: User Profile */}
      <Route path='/home' element={<Homepage/>}/>

      {/*Inaccessable*/}
      <Route path='/user' element={<UserProfile/>}/>

      {/*Inaccessable*/}
      <Route path='/profile' element={<ProfileSelection/>}/>

      {/*Inaccessable*/}
      <Route path='/create' element={<CreateProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;