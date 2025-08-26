import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: candidates = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-guides");
      return res.data;
    },
    onError: () => toast.error("Failed to fetch applications"),
  });

  const handleAccept = async (email) => {
    try {
      const res = await axiosSecure.put(`/users/role/${email}`, { role: "guide" });
      console.log(res.data)
      if (res.data.modifiedCount > 0) {
        toast.success("Guide approved and user role updated");
        refetch();
      } else {
        toast.error("Failed to update user role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong now");
    }
  };

  const handleReject = async (email) => {
    try {
      const res = await axiosSecure.delete(`/pending-guides/${email}`);
      if (res.data.deletedCount > 0) {
        toast.success("Application rejected");
        refetch();
      } else {
        toast.error("Failed to delete application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="text-white p-6">Loading applications...</p>;
  if (isError) return <p className="text-red-500 p-6">Error loading data</p>;

  return (
    <div className="p-6 bg-[#3b4e42] min-h-screen text-white">
      <h1 className="text-3xl font-bold text-lime-300 mb-6">Manage Candidates</h1>

      {candidates.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#4d6b57] border border-lime-400 text-sm">
            <thead>
              <tr className="bg-lime-400 text-black text-left">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, idx) => (
                <tr key={candidate._id} className="border-t border-lime-300">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{candidate.name || "N/A"}</td>
                  <td className="p-3">{candidate.email}</td>
                  <td className="p-3">{candidate.phone || "N/A"}</td>
                  <td className="p-3">{candidate.experience || "N/A"}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleAccept(candidate.email)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(candidate.email)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCandidates;
