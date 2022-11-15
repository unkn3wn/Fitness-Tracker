import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { activityById } from "../api/activities";

function ActivityDetail() {
  const { id } = useParams();
  const [details, setDetail] = useState({});

  useEffect(() => {
    async function loadActivities() {
      const result = await activityById(id);
      setDetail(result);
    }
    loadActivities();
  }, []);

  return (
    <div>
      <div>
        <h1>Workout: {details.name}</h1>
        <h2>Workout Description: {details.description}</h2>
      </div>
    </div>
  );
}

export default ActivityDetail;
