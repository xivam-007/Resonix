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
    <div className="p-8 max-w-xl mx-auto text-white">
      <h2 className="mt-20 text-5xl font-classy text-transparent bg-clip-text bg-gradient-to-r from-[#4f3ddb] via-[#8171fd] via-[#a093fe] to-[#F8E9A1] drop-shadow-xl mb-2">Edit Job</h2>
      <form onSubmit={handleUpdate} className="space-y-4 mt-5">
        <input
          type="text"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          placeholder="Job Title"
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          required
        />

        <textarea
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          placeholder="Job Description"
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          rows={5}
          required
        />

        <input
          type="text"
          value={job.requiredSkills}
          onChange={(e) => setJob({ ...job, requiredSkills: e.target.value })}
          placeholder="Skills (comma separated)"
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#281e5d] text-white px-4 py-2 rounded hover:bg-[#322574]"
        >
          {loading ? 'Updating...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
