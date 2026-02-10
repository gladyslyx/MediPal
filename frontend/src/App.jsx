import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "./App.css";
import Login from "./Login.jsx";
import Homepage from "./Homepage.jsx";
import UserProfile from "./UserProfile.jsx";
import ProfileSelection from "./ProfileSelection.jsx";
import CreateProfile from "./CreateProfile.jsx";

//Web application runner.
function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/*Origin Page -> Home*/}
      <Route index element={<Login/>}/>

      {/* */}
      <Route path='/home' element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;