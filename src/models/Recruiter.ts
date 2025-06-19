import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRecruiter extends Document {
  name: string;
  email: string;
  company?: string;
  profilePicture?: string;
  password: string; // ✅ Add this line
}

const RecruiterSchema: Schema<IRecruiter> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String },
  profilePicture: { type: String, default: 'https://imgs.search.brave.com/WzQXL-_MEyjP82boCkEziDfRL1iTLeolfB32EbcOtLk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5naW1nLmNvbS9z/dGF0aWMvaW1nL2Nh/dC9lbW9qaS5wbmc' },
  password: { type: String, required: true }, // ✅ Add this line
}, { timestamps: true });

const Recruiter: Model<IRecruiter> = mongoose.models.Recruiter || mongoose.model<IRecruiter>('Recruiter', RecruiterSchema);
export default Recruiter;
