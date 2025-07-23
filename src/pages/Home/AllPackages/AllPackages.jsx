import React from "react";
import { useQuery } from "@tanstack/react-query";

import OverViewTabCard from "../Tab/OverViewTabCard";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AllPackages = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tours = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTours"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tours-package");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading packages...</p>;
  if (isError) return <p>Failed to load packages.</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#d1d5dc] text-center">
        All Packages
      </h1>
      
      <p className="text-sm text-gray-100 max-w-3xl mx-auto mb-6 text-center">
        Discover the beauty of Bangladesh through our handpicked tour packages.
        From scenic landscapes to cultural heritage, explore a variety of
        unforgettable experiences crafted just for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <OverViewTabCard key={tour._id} data={tour} />
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
