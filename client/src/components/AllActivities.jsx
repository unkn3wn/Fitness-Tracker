import { useState, useEffect } from "react";
import allActivities from "../api/activities";
import { useNavigate } from "react-router-dom";

function AppsActivities() {
  const nav = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getAllActivities() {
      const aActiv = await allActivities();
      setActivities(aActiv);
    }
    getAllActivities();
  }, []);
 
  
  return (
    <div>
      {activities.map((activ) => {
        return (
          <div key={activ.id}>
            <h3>{activ.id}</h3>
            <h4>WORK OUT: {activ.name}</h4>
            <h5>DESCRIPTION: {activ.description}</h5>
            <button
              onClick={() => {
                nav(`/activities/${activ.id}`);
              }}
            >
              see Details
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AppsActivities;
