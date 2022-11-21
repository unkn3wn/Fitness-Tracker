import { deleteRoutine } from "../api/routines";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function DeleteRoutine() {
  const nav = useNavigate();
  const {routineId} = useParams();
  
  return (
    <button
      onClick={() => {
        deleteRoutine(routineId);
       nav("/routines");
      }}
    >
      Delete this Routine
    </button>
  );
}

export default DeleteRoutine;
