export default  async function allRoutines(){
    const response = await fetch(
        "/routes/routines"
    )
    console.log("hello")
    const result = await response.json();
    return result;
}

export async function createRoutine(is_public, name, goal){
    const response = await fetch(
        "/routes/routines",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                is_public,
                name, 
                goal,
            }),
        });
    const result = await response.json();
    return result;
        
}

export async function singleRoutine(routineId){
  const response = await fetch(
    `/routes/routines/${routineId}`
  )

  const result = await response.json();
  return result;

}

export async function updateRoutine(routineId, is_public, name, goal){
   const response = await fetch(
    `/routes/routines/${routineId}`,
    {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            is_public,
            name,
            goal
        }),
    });
    const result = await response.json();
    return result;
}

export async function deleteRoutine(routineId){
    const response = await fetch(
        `/routes/routines/${routineId}`,
        {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const result = await response.json();
        return result;
}