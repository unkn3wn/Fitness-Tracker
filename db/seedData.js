const testUsers = [
  { username: "David", password: "Thistest" },
  { username: "Ferni", password: "Thisisanothertest" },
  { username: "honda", password: "Japan" },
  { username: "Hurra", password: "Raay" },
];

const testRoutines = [
  {
    creator_id: 1,
    is_public: true,
    name: "monday",
    goal: "do chest and triceps",
  },
  {
    creator_id: 2,
    is_public: true,
    name: "tuesday",
    goal: "back and biceps",
  },
  {
    creator_id: 3,
    is_public: true,
    name: "wednesday",
    goal: "legs and arms",
  },
  {
    creator_id: 4,
    is_public: true,
    name: "thursday",
    goal: "shoulders and chest",
  },
];

const testActivities = [
  {
    //legs

    name: "lunges",
    description:
      "Stand with your feet hip-width apart.Step out wide to the side while keeping your other foot flat.Bend your “stepping” knee while keeping the other knee straight. ...Forcefully push off from your foot to return to the starting position.",
  },

  {
    //triceps, chest

    name: "Pushups",
    description:
      "Hands should be slightly outside shoulder-width apart at chest level.Feet should be hip-width apart and parallel to each other—not turned inward or outward.Hips should be in line with the shoulders, and the lower back should have a neutral curve—not completely flat, but...The head should be positioned so the ears...",
  },

  {
    //legs

    name: "Squats",
    description:
      "Stand tall with your feet hip distance apart. Your hips, knees, and toes should all be facing forward.Bend your knees and extend your buttocks backward as if you are going to sit back into a chair. Make sure that you keep...Rise back up and repeat.",
  },

  {
    //shoulders

    name: "Standing overhead dumbbell presses",
    description:
      "Curl, or clean a pair of dumbbells to shoulder level with your palms facing your body.Stand with your feet shoulder width apart, with your knees locked, glutes contracted. While keeping your low back straight, press the dumbbell overhead with your right hand by rotating your hand towards... Pull the weight down slow and controlled to the starting position with...",
  },
];

const testRoutineActivities = [
  { routine_id: 3, activity_id: 1, duration: 10, count: 23 },
  { routine_id: 4, activity_id: 2, duration: 11, count: 24 },
  { routine_id: 2, activity_id: 3, duration: 13, count: 25 },
];

module.exports = {
  testUsers,
  testRoutines,
  testActivities,
  testRoutineActivities,
};
