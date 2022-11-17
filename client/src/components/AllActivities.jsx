import { useState, useEffect } from "react";
import allActivities from "../api/activities";
import { useNavigate } from "react-router-dom";
import ActivityNavBar from "../navs/ActivityNavs";

function AllActivities() {
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
      <ActivityNavBar />
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
              See Details
            </button>

            <button
              onClick={() => {
                nav(`/changeactivity/${activ.id}`);
              }}
            >
              update activity
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AllActivities;
