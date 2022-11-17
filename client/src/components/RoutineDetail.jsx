import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleRoutine } from "../api/routines";
import DeleteRoutine from "../components/DeleteRoutine";

function RoutineDetail() {
  const { routineId } = useParams();
  const [detial, setDetail] = useState({});

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
      </div>
     
    </div>
    
  );
}

export default RoutineDetail;
