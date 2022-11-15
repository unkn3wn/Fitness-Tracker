import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { singleRoutine } from "../api/routines";


function RoutineDetail() {
  const { id } = useParams();
  const [detial, setDetail] = useState({});

  useEffect(() => {
    async function loadRoutines() {
      const result = await singleRoutine(id);
      setDetail(result);
    }
    loadRoutines();
  },[]);

  return(
    <div>
        <div>
            <h3>Day :{detial.name}</h3>
            <h3>Part of Body To Work out :{detial.goal}</h3>
        </div>
    </div>
  )
}

export default RoutineDetail;
