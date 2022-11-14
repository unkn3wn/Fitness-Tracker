const router = require("express").Router();

router.get("/health", (req, res, next) => {
  res.send("HEALTH PASSED");
});

router.use("/activities", require("./activities"));
router.use("/routine_activities", require("./routine_activities"));
router.use("/routines", require("./routines"));
router.use("/users", require("./users"));

module.exports = router;
