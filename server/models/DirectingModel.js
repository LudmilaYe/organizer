import mongoose from "mongoose";

const directiongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  secondDescription: {
    type: String,
    required: true,
  },

  secondImagePath: {
    type: String,
    required: true,
  },

  imagePath: {
    type: String,
    required: true,
  },

  gallery: [
    {
      type: String,
    },
  ],

  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("Directing", directiongSchema);
