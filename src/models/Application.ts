// src/models/Application.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  studentId: string;
  resumePath: string;
  message?: string;
  updatedCount: number;
  status: 'applied' | 'selected' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    studentId: { type: String, required: true }, // Can be email or ID, depending on your choice
    resumePath: { type: String, required: true },
    message: { type: String },
    updatedCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['applied', 'selected', 'rejected'], // ✅ ADD ENUM
      default: 'applied',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
