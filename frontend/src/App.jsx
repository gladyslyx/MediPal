import "./App.css";
import Login from "./Login.jsx";
import Homepage from "./Homepage.jsx";
import UserProfile from "./UserProfile.jsx";
import ProfileSelection from "./ProfileSelection.jsx";
import CreateProfile from "./CreateProfile.jsx";

//Web application runner.
function App() {
  return (
    <div className="App">
      <Login />
      <Homepage />
      {/* <CreateProfile /> */}
      {/* <ProfileSelection /> */}
      {/* <UserProfile /> */}
    </div>
  );
}

export default App;