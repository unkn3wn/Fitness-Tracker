import { useState } from "react";
import { updateRoutine } from "../api/routines";
import { useNavigate, useParams } from "react-router-dom";

function UpdateRoutines() {
  const [is_public, setIs_Public] = useState([]);
  const [name, setName] = useState([]);
  const [goal, setGoal] = useState([]);
  const { routineId } = useParams();
  const nav = useNavigate();

  return (
    <div>
      <h1>EDIT YOUR ROUTINE</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await updateRoutine(routineId, is_public, name, goal);
          console.log(result);
          nav(`/routines`);
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
          vairant="standard"
          value={goal}
          type="text"
          placeholder="new goal"
          onChange={(event) => {
            setGoal(event.target.value);
          }}
        />
        <button type="submit">SUBMIT CHANGES</button>
      </form>
    </div>
  );
}

export default UpdateRoutines;
