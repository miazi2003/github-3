import React from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router";

const MyBookings = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate()

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });
console.log(bookings.length)
  const cancelBooking = async (bookingId) => {
    console.log(bookingId)
    const res = await axiosSecure.delete(`/cancel-booking/${bookingId}`);
    if (!res.data.success) throw new Error("Failed to cancel booking");
    return bookingId;
  };

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", email] });
    },
  });

  const handleCancel = (bookingId) => {
    cancelMutation.mutate(bookingId);
  };

  if (isLoading)
    return <div className="text-white text-center  min-h-screen bg-[#4d6b57] flex justify-center items-center">Loading...</div>;
  if (isError)
    return (
     <div className="text-white text-center  min-h-screen bg-[#4d6b57] flex justify-center items-center">Error Loading Bookings</div>
    );

     if(bookings.length === 0){
       return <div className="text-white text-center  min-h-screen bg-[#4d6b57] flex justify-center items-center">No Bookings Found...</div>;
     }

  return (
    <div className="min-h-screen bg-[#4d6b57] p-8 text-white">
      <h1 className="text-4xl font-bold text-center text-lime-400 mb-10 drop-shadow-lg">
        ✨ My Bookings ✨
      </h1>

      <div className="overflow-x-auto bg-[#3e5a49] rounded-2xl shadow-2xl border border-green-400">
        <table className="min-w-full text-center">
          <thead className="bg-[#2f4c3b] text-lime-300 text-sm uppercase tracking-wide">
            <tr>
              {["Package", "Tour Guide", "Date", "Price", "Status", "Actions"].map(
                (header, i) => (
                  <th
                    key={i}
                    className="p-4 border-b border-green-400 font-semibold"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#2f4c3b] border-b border-green-400"
              >
                <td className="p-4 text-white">{booking.packageName}</td>
                <td className="p-4 text-white">{booking.guideName}</td>
                <td className="p-4 text-white">{booking.tourDate}</td>
                <td className="p-4 text-lime-300 font-medium">
                  ${booking.price}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : booking.status === "Accepted"
                        ? "bg-green-500 text-white"
                        : booking.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-gray-400 text-black"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  {booking.status === "pending" && (
                    <>
                     <Link to={`/dashBoard/payment/${booking._id}`}>
                      <button
                        className="bg-lime-500 hover:bg-lime-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md shadow-lime-300/40 transition-all"
                      >
                        Pay
                      </button></Link>
                      <button
                        onClick={()=>{handleCancel(booking._id)}}
                        className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md shadow-red-300/40 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
