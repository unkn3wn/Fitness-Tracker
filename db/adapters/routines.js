const client = require("../client");

//getting routine by id 
const getRoutineById = async (id) => {
  const {
    rows: [Routine],
  } = await client.query(
    `
    SELECT * FROM Routine
    WHERE id = $1
  `,
    [id]
  );
  return Routine;
};

const getRoutinesWithoutActivities = async()=>{
  const{
    rows
  } = await client.query(`
    SELECT * FROM Routines
      WHERE Activities = null;
  `)
}

//getting all routines
const getAllRoutines = async()=>{
   const{
    rows:[Routines]
   } = await client.query(`
    SELECT * FROM ROUTINES
     JOIN Activites; 
   `)


}