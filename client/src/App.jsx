//all my activities
import { Routes, Route } from "react-router-dom";
import Home from "./components/Homepage";
import NavBar from "./navs/NavBar";
import AllTheActivities from "./components/AllActivities";
import AppsRoutines from "./components/AllRoutines";
import Register from "./components/Register";
import TheLogin from "./components/Login";
import CreateRoutine from "./components/CreateRoutine";
import RoutineDetail from "./components/RoutineDetail";
import ActivityDetail from "./components/ActivityDetail";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* home routes */}
        <Route path="/" element={<Home />} />

        {/* activity routes */}
        <Route path="/activities" element={<AllTheActivities />} />
        <Route path="/activities/:activityId" element={<ActivityDetail />}/>

        {/* routine routes */}
        <Route path="/routines" element={<AppsRoutines />} />
        <Route path="/routines/create" element={<CreateRoutine />} />
        {/* <Route path="routes/routines//:routineId" element={<RoutineDetail/>}/> */}
        <Route path="/routines/:routineId" element={<RoutineDetail />} />

        {/* auth routes */}
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<TheLogin />} />
      </Routes>
    </div>
  );
}

export default App;
