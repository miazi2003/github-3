import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const StatCards = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const email = user?.email
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats" , {
        headers : {
            email
        }
      } );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-white">Loading stats...</p>;

  const stats = [
    { title: "Total Payment", value: data?.totalPayment || 0 },
    { title: "Total Guides", value: data?.totalTourGuides || 0 },
    { title: "Total Clients", value: data?.totalClients || 0 },
    { title: "Total Packages", value: data?.totalPackages || 0 },
    { title: "Total Stories", value: data?.totalStories || 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#4d6b57] border border-green-400 rounded-xl shadow p-6"
        >
          <h2 className="text-white text-lg font-semibold">{stat.title}</h2>
          <p className="text-lime-300 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
