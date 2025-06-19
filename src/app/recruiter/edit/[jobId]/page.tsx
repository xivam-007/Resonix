'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const EditJobPage = () => {
  const { jobId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState({
    title: '',
    description: '',
    requiredSkills: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch job details on mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const data = await res.json();

        if (res.ok) {
          setJob({
            title: data.title,
            description: data.description,
            requiredSkills: data.requiredSkills.join(', '),
          });
        } else {
          alert(data.error || 'Failed to load job details');
          router.push('/dashboard/recruiter');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
        router.push('/dashboard/recruiter');
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, router]);

  // Handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedJob = {
      ...job,
      requiredSkills: job.requiredSkills.split(',').map((skill) => skill.trim()),
    };

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert('Job updated successfully!');
        router.push('/dashboard/recruiter');
      } else {
        alert(data.error || 'Failed to update job');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the job');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Job</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          placeholder="Job Description"
          className="w-full border p-2 rounded"
          rows={5}
          required
        />

        <input
          type="text"
          value={job.requiredSkills}
          onChange={(e) => setJob({ ...job, requiredSkills: e.target.value })}
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Updating...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
