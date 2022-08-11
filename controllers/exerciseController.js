import "../db/db.js";
import Excercise from "../models/exerciseModel.js";

export const createExercise = async (req, res) => {
  const { username, _id } = req.user;
  const { description, duration, date } = req.body;
  const data = {
    userId: _id,
    description: description,
    duration: duration,
    date: date
      ? new Date(date).toDateString()
      : new Date(Date.now()).toDateString(),
  };
  const exercise = await Excercise.create(data);
  res.json({
    username: username,
    description: description,
    duration: duration,
    date: date
      ? new Date(date).toDateString()
      : new Date(Date.now()).toDateString(),
    _id: _id,
  });
};

export const getExercises = async (req, res) => {
  try {
    const { from, to, limit } = req.query;
    const { username, _id } = req.user;
    let dateObj = {};
    if (from) {
      dateObj["$gte"] = new Date(from);
    }
    if (to) {
      dateObj["$lte"] = new Date(to);
    }
    let filter = {
      userId: _id,
    };
    if (from || to) {
      filter.date = dateObj;
    }
    let nonNullLimit = limit ?? 500;
    const exercises = await Excercise.find(filter)
      .select(`description duration date`)
      .limit(+nonNullLimit)
      .exec((err, data) => {
        if (err || !data) {
          res.json([]);
        } else {
          const count = data.length;
          const rawLog = data;
          const log = rawLog.map((l) => ({
            description: l.description,
            duration: l.duration,
            date: l.date.toDateString(),
          }));
          res.json({ username, count, _id, log });
        }
      });
  } catch (error) {
    res.status(500).json({ message: "could not get exercises" });
  }
};
