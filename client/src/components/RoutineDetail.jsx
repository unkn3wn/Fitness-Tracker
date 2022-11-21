import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// my routine imports
import { singleRoutine } from "../api/routines";
import DeleteRoutine from "../components/DeleteRoutine";
//my activity imports
import allActivities from "../api/activities";
//my routine activity importes
import {
  createRoutineActivities,
  deleteRoutineActivity,
  updateRoutineActivity,
} from "../api/routine_activities";

function RoutineDetail() {
  const nav = useNavigate();
  const { routineId } = useParams();
  const [detial, setDetail] = useState({});
  const [activities, setActivities] = useState([]);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setErorr] = useState();

  useEffect(() => {
    async function loadRoutines() {
      const routine = await singleRoutine(routineId);
      setDetail(routine);
    }
    loadRoutines();
  }, []);
  console.log(detial);

  useEffect(() => {
    async function getAllActivities() {
      const aActiv = await allActivities();
      setActivities(aActiv);
    }
    getAllActivities();
  }, []);

  return (
    <div>
      <div>
        <h1>The Routine</h1>
        <h2>Day :{detial.name}</h2>
        <h3>Part of Body To Work out :{detial.goal}</h3>
        <DeleteRoutine />

        <h1>Some activities to do with this routine</h1>

        {detial.activities?.map((activity) => {
          return (
            <div>
              <h3>Name:{activity.name}</h3>
              <h5>Description:{activity.description}</h5>
              <h5>Duration: {activity.duration}</h5>
              <h5>reps: {activity.count}</h5>

              <button
                onClick={() => {
                  deleteRoutineActivity(detial.id, activity.id);
                  nav("/routines");
                }}
              >
                Delete Activity from Routine
              </button>
            </div>
          );
        })}

        {/* drop down for my activities */}
        {/* have to make it create a routine activity */}
        <h3>Add a Activity to this routine</h3>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // first element in form and event.target value is the value of the whole form
            // whihc allows us to get the first element
            const activityId = event.target[0].value;
            console.log(activityId);
            nav(`/routines`)
            const result = await createRoutineActivities(
              routineId,
              activityId,
              count,
              duration
            );
            console.log(result);
            if(result.message){
              setErorr(result.message)
            }else{
              console.log("works")
            }
          }}
        >
          <select>
            <option value="">--Please choose an activity--</option>
            {activities.map((activ) => {
              return (
                <option value={activ.id} key={activ.id}>
                  {activ.name}
                </option>
              );
            })}
          </select>

          <input
            variant="standard"
            placeholder="count"
            type="text"
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />

          <input
            variant="standard"
            type="text"
            placeholder="duration"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
          {error && <h5>{error}</h5>}
          <button type="submit">Submit</button>
        </form>
      </div>
     
    </div>
    
  );
}
export default RoutineDetail;
