import react from "react";
import {useState, useEffect} from "react";
import allActivities from "../api/activities";


function AppsActivities (){
    const [activities, setActivities] = useState([]);
    
    useEffect(() => {
        async function getAllActivities() {
          const aActiv = await allActivities();
          setActivities(aActiv);
        }
        getAllActivities();
      }, []);


     return(

        <div>
            {activities.map((activ)=>{
                return(
                    <div key={activ._id}>
                        <h3></h3>
                        <h4>WORK OUT: {activ.name}</h4>
                        <h5>DESCRIPTION: {activ.description}</h5>

                    </div>
                )


            })}
        </div>




     )
}

export default AppsActivities;