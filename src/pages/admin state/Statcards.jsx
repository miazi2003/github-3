import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { Loader2, BarChart3, Users, Package, DollarSign, BookOpen } from "lucide-react";

const StatCards = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats", {
        headers: {
          email,
        },
      });
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-green-400 w-8 h-8" />
      </div>
    );



  const stats = [
    {
      title: "Total Payment",
      value: data?.totalPayment || 0,
      icon: <DollarSign className="text-green-300 w-8 h-8" />,
    },
    {
      title: "Total Guides",
      value: data?.totalTourGuides || 0,
      icon: <Users className="text-green-300 w-8 h-8" />,
    },
    {
      title: "Total Clients",
      value: data?.totalClients || 0,
      icon: <BarChart3 className="text-green-300 w-8 h-8" />,
    },
    {
      title: "Total Packages",
      value: data?.totalPackages || 0,
      icon: <Package className="text-green-300 w-8 h-8" />,
    },
    {
      title: "Total Stories",
      value: data?.totalStories || 0,
      icon: <BookOpen className="text-green-300 w-8 h-8" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#4d6b57] border border-green-400 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex items-center space-x-4"
        >
          <div className="bg-[#3b4e42] p-3 rounded-full">
            {stat.icon}
          </div>
          <div>
            <h2 className="text-white text-md font-semibold">{stat.title}</h2>
            <p className="text-lime-300 text-3xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
