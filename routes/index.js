const router = require("express").Router();
router.get("/health", (req, res, next)=> {
    res.send("HEALTH PASSED")
});

// router.use("/activites", require("./activites"));
router.use("/routine_activites", require("./routine_activites"));
// router.use("/routines", require("./routines"));
// router.use("/users", require("./users"));

module.exports = router;
