import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
    },
    freelancer_id: {
      type: String,
      required: true,
    },
    Skills: {
      type: [],
      default: undefined,
    },
    githubProject: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

export const Projects = mongoose.model("Projects", ProjectsSchema);