import react from "react";
import { useState, useEffect } from "react";
import allRoutines from "../api/routines";
import RoutineNavBar from "../navs/RoutineNavs";
import { useNavigate } from "react-router-dom";

function AppsRoutines() {
  const nav = useNavigate();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getAllRoutines() {
      const theRoutines = await allRoutines();
      setRoutines(theRoutines);
    }
    getAllRoutines();
  }, []);

  return (
    <div>
      <RoutineNavBar />
      {routines.map((routi) => {
        return (
          <div key={routi.id}>
            <h1>{routi.creatorName}</h1>
            <h2>{routi.name}</h2>
            <h3>{routi.goal}</h3>

            <button
              onClick={() => {
                nav(`/routines/${routi.id}`);
              }}
            >
              See details
            </button>

            <button
              onClick={() => {
                nav(`/changeroutine/${routi.id}`);
              }}
            >
              Update Routine
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default AppsRoutines;
