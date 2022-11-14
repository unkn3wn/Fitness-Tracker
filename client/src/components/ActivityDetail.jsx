import {useEffect, useParams, useState} from "react";
import singleRoutine from "../api/activities"
import routineById from "../api/activities"

function ActivityDetail(){
    const {rId} = useParams();
    const [oneActivity, setActivity] = useState({});

    useEffect(()=>{
        const getActivityById = async()=>{
            const acti = await routineById(rId);
            setActivity(acti)
        };
        getActivityById();
    },[]);


    return(
        <div>
            <div>
                <h3>{oneActivity.name}</h3>
                <h3>{oneActivity.description}</h3>
            </div>
        </div>
    )

}

export default ActivityDetail;