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
        <Route path="/routes/activites" element={<AllTheActivities />} />
        <Route
          path="/routes/activites/:activityId"
          element={<ActivityDetail />}
        />

        {/* routine routes */}
        <Route path="/routes/routines" element={<AppsRoutines />} />
        <Route path="/routes/routines/create" element={<CreateRoutine />} />
        {/* <Route path="routes/routines//:routineId" element={<RoutineDetail/>}/> */}
        <Route path="/routes/routines/:routineId" element={<RoutineDetail />} />

        {/* auth routes */}
        <Route path="/routes/users/register" element={<Register />} />
        <Route path="/routes/users/login" element={<TheLogin />} />
      </Routes>
    </div>
  );
}

export default App;
