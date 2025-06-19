//src/models/Student.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  resumeUrl?: string;
  resumeUpdatedAt: Date;
  resumeUpdateCount: number;
  appliedJobs: mongoose.Types.ObjectId[]; // Array of Job _id references
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resumeUrl: { type: String, required: false },
  resumeUpdatedAt: { type: Date, default: Date.now },
  resumeUpdateCount: { type: Number, default: 0 },

  // ✅ New field to track applied jobs
  appliedJobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  ],
});

export default mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
