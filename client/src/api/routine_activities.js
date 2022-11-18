export async function allRoutineActivities(){
    const response = await fetch(
        "/routes/routine_activities"
    )
    const result = await response.json();
    return result;
}

export async function createRoutineActivities(routine_id, activity_id, count, duration){
    const response = await fetch(
        "/routes/routine_activities",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                routine_id,
                activity_id,
                count,
                duration
            })
        }
    )
    const result = await response.json();
    return result;
}

export async function updateRoutineActivity(id, duration, count){
    const response = await fetch(
        `/routes/routine_activities/${id}`,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
        },
            body: JSON.stringify({
                count,
                duration
            })
        });
        const result = await response.json();
        return result;
}
