import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  fileTree: {
    type: Object,
    default: {},
  },
});

export default mongoose.model("project", projectSchema); 