import { useState } from "react";
import { updateActivites } from "../api/activities";
import {useParams} from "react-router-dom"

function UpdateActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const {activityId} = useParams();


  return (
    <div>
      <h1>EDIT YOUR ACTIVITY</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await updateActivites(activityId,name, description);
          console.log(result);

          if(result.message){
            setError(result.message)
          }else{
            console.log("yessir")
          }

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
        {error && <h6>{error}</h6>}
        <button 
        type="submit"
        >SUBMIT CHANGES</button>
      </form>
    </div>
  );
}

export default UpdateActivity;