//react imports
import { Routes, Route } from "react-router-dom";
//import user stuff
import Register from "./components/Register";
import TheLogin from "./components/Login";
//navs
import Home from "./components/Homepage";
import NavBar from "./navs/NavBar";
//activities import
import AllTheActivities from "./components/AllActivities";
import ActivityDetail from "./components/ActivityDetail";
import CreateActivity from "./components/CreateActivity";
import UpdateActivity from "./components/UpdateActivity";

//routines import
import AllRoutines from "./components/AllRoutines";
import RoutineDetail from "./components/RoutineDetail";
import CreateRoutine from "./components/CreateRoutine";
import UpdateRoutines from "./components/UpdateRoutines";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        {/* home routes */}
        <Route path="/" element={<Home />} />

        {/* activity routes */}
        <Route path="/activities" element={<AllTheActivities />} />
        <Route path="/activities/:activityId" element={<ActivityDetail />} />
        <Route path="/activities/create" element={<CreateActivity />} />
        <Route
          path="/changeactivity/:activityId"
          element={<UpdateActivity />}
        />

        {/* routine routes */}
        <Route path="/routines" element={<AllRoutines />} />
        <Route path="/routines/create" element={<CreateRoutine />} />
        <Route path="/changeroutine/:routineId" element={<UpdateRoutines />} />
        <Route path="/routines/:routineId" element={<RoutineDetail />} />
      
        {/* auth routes */}
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<TheLogin />} />
      </Routes>
    </div>
  );
}

export default App;
