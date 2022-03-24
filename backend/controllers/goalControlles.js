const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
// @desc Get goals
// @route Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
// @desc set goals
// @route Post /api/goals/:id
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc Upbdate goals
// @route Put /api/goals/:id
// @access Private
const upbdateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not auth");
  }
  const upbdatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(upbdatedGoal);
});

// @desc delete goals
// @route Get/api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not auth");
  }
  await Goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  upbdateGoals,
  deleteGoals,
};
