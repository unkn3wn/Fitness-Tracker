import react from "react";
import {useState, useEffect} from "react"
import allRoutines from "../api/routines"
import RoutineNavBar from "../navs/CreateRoutineNav"

function AppsRoutines(){
   
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        async function getAllRoutines() {
          const theRoutines = await allRoutines();
          setRoutines(theRoutines);
        }
        getAllRoutines();
      }, []);

      return(
        
        <div>
          <RoutineNavBar/>
            {routines.map((routines)=>{
                return(
                    <div key={routines._id}>
                        <h3>{routines.name}</h3>
                        <h3>{routines.goal}</h3>
                    </div>
                )
            })}
        </div>
      )

}
export default AppsRoutines;