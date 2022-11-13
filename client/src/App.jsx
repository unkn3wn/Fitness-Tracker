//all my activities
import {Routes, Route} from "react-router-dom"
import Home from "./components/Homepage"
import NavBar from "./navs/NavBar";
import AllTheActivities from "./components/AllActivities"
import AppsRoutines from "./components/AllRoutines"
import Register from "./components/Register";
import TheLogin from "./components/Login";



function App() {
  return(
    <div>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/routes/activites" element={< AllTheActivities/>}/>
            <Route path="/routes/routines" element={<AppsRoutines/>}/>
            <Route path="/routes/users/register" element={<Register/>}/>
            <Route path="/routes/users/login" element={<TheLogin/>}/>
        </Routes>
        
    </div>
  )
}

export default App;
