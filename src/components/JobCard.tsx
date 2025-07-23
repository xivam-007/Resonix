import { useRouter } from 'next/navigation';
import { Job } from '@/types/job'; // ✅ Your Job type

const JobCard = ({ job }: { job: Job }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/recruiter/edit/${job._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${job._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        alert('Job deleted successfully!');
        router.refresh(); // Refresh the current page to update the job list
      } else {
        alert(data.error || 'Failed to delete job.');
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div className="border border-gray-900 p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="mb-2">{job.description}</p>

      {job.createdAt && (
        <p className="text-sm text-gray-500">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 mt-3">
        <button onClick={handleEdit} className="hover:underline bg-transparent text-white border border-gray-600 hover:bg-gray-800 px-3 py-1 rounded">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-[#800000] hover:underline text-white px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
