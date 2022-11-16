import { deleteRoutine } from "../api/routines";
import { useNavigate } from "react-router-dom";

function DeleteRoutine() {
  const nav = useNavigate();

  return (
    <button
      onClick={() => {
        deleteRoutine();
        nav("/routines");
      }}
    >
      Delete this Routine
    </button>
  );
}

export default DeleteRoutine;
