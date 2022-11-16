import { useState } from "react";
import { createActivities } from "../api/activities";
import { useNavigate } from "react-router-dom";

function CreateActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createActivities(name, description);
          setName("");
          setDescription("");
          console.log(result);
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

        <label>Description</label>
        <input
          variant="standard"
          value={description}
          type="text"
          placeholder="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <button type="submit">Submit Activity</button>
      </form>
    </div>
  );
}


export default CreateActivity