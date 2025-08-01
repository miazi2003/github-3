import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useState } from "react";

const AllAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: tours = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["assignedTours"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/assigned-tours");
      return res.data;
    },
    onError: () => {
      toast.error("❌ Failed to load assigned tours");
    },
    onSuccess: () => {
      toast.success("✅ Assigned tours loaded");
    },
  });

  if (isLoading) return <p className="text-white p-4">Loading assigned tours...</p>;
  if (isError) return <p className="text-red-400 p-4">Error: {error.message}</p>;

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const paginatedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 text-white bg-[#3b4e42] min-h-screen">
      <h1 className="text-3xl font-bold text-lime-300 mb-6">📋 Assigned Tours</h1>

      {tours.length === 0 ? (
        <p>No assigned tours found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#4d6b57] border border-lime-400 text-sm">
              <thead>
                <tr className="text-left bg-lime-400 text-black">
                  <th className="p-3">#</th>
                  <th className="p-3">Tour Name</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Client Email</th>
                  <th className="p-3">Guide Name</th>
                  <th className="p-3">Cost</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTours.map((tour, index) => (
                  <tr key={tour._id || index} className="border-t border-lime-300">
                    <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="p-3">{tour.packageName || "N/A"}</td>
                    <td className="p-3">{tour.touristName || "N/A"}</td>
                    <td className="p-3">{tour.touristEmail}</td>
                    <td className="p-3">{tour.guideName || "N/A"}</td>
                    <td className="p-3">${tour.price}</td>
                    <td className="p-3">{tour.status}</td>
                    <td className="p-3">{tour.tourDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === idx + 1
                    ? "bg-lime-400 text-black font-bold"
                    : "bg-[#4d6b57] text-white border-lime-400"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllAssignedTours;
