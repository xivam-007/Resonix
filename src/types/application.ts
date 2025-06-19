export interface Application {
  _id: string;
  jobId: string;
  resumeUrl: string;
  status: 'applied' | 'selected' | 'rejected';
  student: {
    _id: string;
    name: string;
    email: string;
  };
}
