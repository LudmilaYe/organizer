import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imagePath: {
    type: String,
    required: true,
  },

  start: {
    type: String,
    required: true,
  },

  finish: {
    type: String,
    required: true,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  userApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Event", eventSchema);
