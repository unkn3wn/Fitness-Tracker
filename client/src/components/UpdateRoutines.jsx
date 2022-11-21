import { useState } from "react";
import { updateRoutine } from "../api/routines";
import { useParams } from "react-router-dom";

function UpdateRoutines() {
  const [is_public, setIs_Public] = useState([]);
  const [name, setName] = useState([]);
  const [goal, setGoal] = useState([]);
  const [error, setError]= useState();
  const { routineId } = useParams();

  return (
    <div>
      <h1>EDIT YOUR ROUTINE</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await updateRoutine(routineId, is_public, name, goal);
          console.log(result);
          
          if(result.message){
            setError(result.message);
          }else{
            return(
              <h5>it was a success</h5>
            )
          }

        }}
      >
        <input
          variant="standard"
          value={is_public}
          type="text"
          placeholder="true or false"
          onChange={(event) => {
            setIs_Public(event.target.value);
          }}
        />
        <input
          variant="standard"
          value={name}
          type="text"
          placeholder="new name of routine"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <input
        vairant= "standard"
        value= {goal}
        type="text"
        placeholder="new goal"
        onChange={(event)=>{
            setGoal(event.target.value);
        }}
        />
        {error && <h6>{error}</h6>}
        <button type="submit">SUBMIT CHANGES</button>
      </form>
    </div>
  );
}

export default UpdateRoutines;