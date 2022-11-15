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
        "/routes/routines/",
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

export async function updateRoutine(id, is_public, name, goal){
   const response = await fetch(
    `routes/routines/${id}`,
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

export async function deleteRoutine(id){
    const response = await fetch(
        `routes/routines/${id}`,
        {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const result = await response.json();
        return result;
}