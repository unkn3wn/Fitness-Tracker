import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activityById } from "../api/activities";

function ActivityDetail() {
  const { activityId } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    async function loadActivities() {
      const result = await activityById(activityId);
      setDetail(result);
    }
    loadActivities();
  }, []);

  return (
    <div>
      <div>
        <h1>Workout:{detail.name}</h1>
        <h2>Workout Description: {detail.description}</h2>
      </div>
    </div>
  );
}

export default ActivityDetail;
