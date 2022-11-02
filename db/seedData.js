const testUsers = [
  { username: "David", password: "Thistest" },
  { username: "Ferni", password: "Thisisanothertest" },
  { username: "honda", password: "Japan" },
  { username: "Hurra", password: "Raay" },
];

const testRoutines = [
  {
    id: 1,
    creator_id: 1,
    is_Public: "True",
    name: "monday",
    goal: "do chest and triceps",
  },
  {
    id: 2,
    creator_id: 2,
    is_Public: "True",
    name: "tuesday",
    goal: "back and biceps",
  },
  {
    id: 3,
    creator_id: 3,
    is_Public: "True",
    name: "wednesday",
    goal: "legs and arms",
  },
  {
    id: 4,
    creator_id: 4,
    is_Public: "True",
    name: "thursday",
    goal: "shoulders and chest",
  },
];

const testActivities = [
  {
    //legs
    id: 1,
    name: "lunges",
    description:
      "Stand with your feet hip-width apart.Step out wide to the side while keeping your other foot flat.Bend your “stepping” knee while keeping the other knee straight. ...Forcefully push off from your foot to return to the starting position.",
  },

  {
    //triceps, chest
    id: 2,
    name: "Pushups",
    description:
      "Hands should be slightly outside shoulder-width apart at chest level.Feet should be hip-width apart and parallel to each other—not turned inward or outward.Hips should be in line with the shoulders, and the lower back should have a neutral curve—not completely flat, but...The head should be positioned so the ears...",
  },

  {
    //legs
    id: 3,
    name: "Squats",
    description:
      "Stand tall with your feet hip distance apart. Your hips, knees, and toes should all be facing forward.Bend your knees and extend your buttocks backward as if you are going to sit back into a chair. Make sure that you keep...Rise back up and repeat.",
  },

  {
    //shoulders
    id: 4,
    name: "Standing overhead dumbbell presses",
    description:
      "Curl, or clean a pair of dumbbells to shoulder level with your palms facing your body.Stand with your feet shoulder width apart, with your knees locked, glutes contracted. While keeping your low back straight, press the dumbbell overhead with your right hand by rotating your hand towards... Pull the weight down slow and controlled to the starting position with...",
  },
];

const testRoutineActivities = [
  { testRoutine_id: 3, testActivities_id: 1 },
  { testRoutine_id: 1, testActivities_id: 2 },
  { testRoutine_id: 3, testActivities_id: 2 },
];

module.exports = {
  testUsers,
  testRoutines,
  testActivities,
  testRoutineActivities,
};
