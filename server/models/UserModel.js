import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 100,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
    minlength: 8,
  },

  group: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  birthdate: {
    type: String,
    default: "",
  },

  role: {
    type: "String",
    require: true,
    default: "Студент",
    enum: [
      "Студент",
      "Организатор",
      "Руководитель в.о.",
      "Руководитель направления",
      "Администратор",
    ],
  },

  directing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Directing",
    },
  ],

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("User", userSchema);
