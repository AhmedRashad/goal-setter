const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  upbdateGoals,
  deleteGoals,
} = require("../controllers/goalControlles");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, upbdateGoals).delete(protect, deleteGoals);

module.exports = router;
