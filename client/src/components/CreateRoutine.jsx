import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";

function CreateRoutine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [ublic, setUblic] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(creator_id, is_public, name, goal);
          navigate("/");
        }}
      >
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          placeholder="Date Of Routine"
        />

        <input
          value={goal}
          onChange={(event) => {
            setGoal(event.target.value);
          }}
          type="text"
          placeholder="Goal for the Routine Day"
        />

        <label>
          <input
            value={is_public}
            onChange={(event) => {
              setIs_public(event.taget.value);
            }}
            type="checkbox"
          />
        </label>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Submit Routine
        </button>
      </form>
    </div>
  );
}

export default CreateRoutine;
