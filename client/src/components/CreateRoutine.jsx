import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";

function CreateRoutine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [is_public, setIs_Public] = useState("");

  ///handleChange() = this allows to handle input change
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(is_public, name, goal);
          setName("");
          setGoal("");
          setIs_Public("");
          console.log(result);
          navigate("/routines");
        }}
      >
        <label>NAME:</label>
        <input
          variant="standard"
          value={name}
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>GOAL:</label>
        <input
          variant="standard"
          value={goal}
          type="text"
          placeholder="goal"
          onChange={(event) => {
            setGoal(event.target.value);
          }}
        />

        <label>
          <input
            variant="standard"
            value={is_public}
            type="text"
            placeholder="true or false"
            onChange={(event) => {
              setIs_Public(event.target.value);
            }}
          />
        </label>

        <button type="submit">Submit Routine</button>
      </form>
    </div>
  );
}

export default CreateRoutine;
