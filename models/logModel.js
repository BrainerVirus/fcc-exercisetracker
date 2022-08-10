import mongoose from "mongoose";
const { Schema, model } = mongoose;

const logSchema = new Schema({
  usernname: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
  },
  log: [
    {
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
        required: true,
      },
    },
  ],
});

const Log = model("Log", logSchema);
export default Log;
