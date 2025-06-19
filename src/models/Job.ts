// src/models/Job.ts
import { Schema, model, models } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: [String],
      required: true,
    },
    recruiterId: {
      type: String,  // Use string for recruiterId to store email
      required: true,
    },
  },
  { timestamps: true }
);

const Job = models.Job || model("Job", jobSchema);
export default Job;
