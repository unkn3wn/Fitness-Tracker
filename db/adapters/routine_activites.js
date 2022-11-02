// // create table for routineActivities
// const { client } = require("../client");
// //getting routine by id
// const  = async ({ creator_id, is_public, name, goal }) => {
//   const {
//     rows: [routine],
//   } = await client.query(
//     `
//         INSERT INTO routines (creator_id, is_public, name, goal)
//         VALUES ($1, $2, $3,$4)
//         RETURNING *
//     `,
//     [creator_id, is_public, name, goal]
//   );
//   return routine;
// };

// module.exports = { createRoutine };