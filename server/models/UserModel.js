import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  role: {
    type: "String",
    required: true,
    default: "Студент",
    enum: ["Студент", "Организатор", "Руководитель в.о.", "Руководитель направления", "Администратор"]
  },

  directing: [
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ]
});

export default mongoose.model("User", userSchema);