import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// my routine imports
import { singleRoutine } from "../api/routines";
import DeleteRoutine from "../components/DeleteRoutine";
import { allRoutineActivities, createRoutineActivities } from "../api/routine_activities";
//my activity imports
import allActivities from "../api/activities";

function RoutineDetail() {
  const { routineId } = useParams();
  const [detial, setDetail] = useState({});
  const [activities, setActivities] = useState([]);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    async function loadRoutines() {
      const result = await singleRoutine(routineId);
      setDetail(result);
    }
    loadRoutines();
  }, []);
  console.log(detial);
  return (
    <div>
      <div>
     
        <h3>Day :{detial.name}</h3>
        <h3>Part of Body To Work out :{detial.goal}</h3>
        <DeleteRoutine />

        {activities.map((activ)=>{
          return(
            <div>
              <h3>{activ.name}</h3>
            </div>
          )
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
            const result = await createRoutineActivities(
              routineId,
              activityId,
              count,
              duration
            );
            console.log(result);
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

          <button type="submit">Submit</button>
        </form>
      </div>
     
    </div>
    
  );
}
export default RoutineDetail;
