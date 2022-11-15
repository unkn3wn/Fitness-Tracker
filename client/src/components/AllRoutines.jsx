import {useState, useEffect} from "react"
import allRoutines from "../api/routines"
import RoutineNavBar from "../navs/CreateRoutineNav"
import {useNavigate} from "react-router-dom"


function AppsRoutines(){
    const navigate = useNavigate();
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
            {routines.map((routi)=>{
                return(
                    <div key={routi.id}>
                        <h3>{routi.name}</h3>
                        <h3>{routi.goal}</h3>
                        <button 
                        onClick={()=>{
                          navigate(`/routines/${routi.id}`)
                        }}
                        >See details</button>
                    </div>
                )
            })}
        </div>
      )

}
export default AppsRoutines;