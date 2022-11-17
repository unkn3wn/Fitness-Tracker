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

  return (
    <div>
      <div>
        <h1>Creator:{detial.creatorName}</h1>
        <h2>Day:{detial.name}</h2>
        <h3>Part of Body To Work out:{detial.goal}</h3>
        <DeleteRoutine />
      </div>
    </div>
  );
}

export default RoutineDetail;
