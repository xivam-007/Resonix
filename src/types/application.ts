import { Job } from "./job";
export interface Application {
  _id: string;
  jobId: Job | null;
  resumeUrl: string;
  status: 'applied' | 'selected' | 'rejected';
  student: {
    _id: string;
    name: string;
    email: string;
  };
}
