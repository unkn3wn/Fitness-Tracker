import { useState } from "react";
import { updateActivites } from "../api/activities";
import { useNavigate, useParams } from "react-router-dom";

function UpdateActivity() {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const { activityId } = useParams();
  const nav = useNavigate();

  return (
    <div>
      <h1>EDIT YOUR ACTIVITY</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await updateActivites(activityId, name, description);
          console.log(result);
          nav(`/activities/${activityId}`);
        }}
      >
        <input
          variant="standard"
          value={name}
          type="text"
          placeholder="change name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <input
          variant="standard"
          value={description}
          type="text"
          placeholder="change description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <button type="submit">SUBMIT CHANGES</button>
      </form>
    </div>
  );
}

export default UpdateActivity;
