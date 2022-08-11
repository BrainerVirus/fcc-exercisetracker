import mongoose from "mongoose";
const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

const Exercise = model("Exercise", exerciseSchema);
export default Exercise;
