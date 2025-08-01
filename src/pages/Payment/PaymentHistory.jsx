import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const PaymentHistory = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosSecure = useAxiosSecure();

  console.log("User Email:", userEmail); // ✅ Debugging aid

  const {
    data: parcelHistory = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parcels", userEmail],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/savedPayments?email=${userEmail}`
        );
        console.log("Fetched parcel data:", res.data); // ✅ Debugging aid
        return res.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    enabled: !!userEmail,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-8">
        Something went wrong while fetching payment history.
      </div>
    );
  }

  console.log("parcelStory", parcelHistory);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <button className="btn btn-outline mb-4" onClick={() => refetch()}>
        Refresh
      </button>

      {parcelHistory.length === 0 ? (
        <p className="text-center text-gray-600">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden text-sm">
            <thead className="bg-lime-100 text-gray-700">
              <tr className="text-left">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tracking ID</th>
                <th className="px-4 py-3">Customer Email</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Delivery Status</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {parcelHistory.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 1 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="px-4 py-2 font-medium">{index + 1}</td>
                  <td className="px-4 py-2 font-semibold text-blue-700">
                    {item.parcelId}
                  </td>

                  <td className="px-4 py-2">{item.paidBy}</td>

                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {item.deliveryStatus || "NotCollected"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-green-600 font-semibold">
                      {item.paymentStatus || "Paid"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.paidAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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

export default PaymentHistory;

// amount
// :
// 510
// email
// :
// "yeasinmiazi2003@gmail.com"
// paidAt
// :
// "2025-07-06T18:45:22.814Z"
// paidBy
// :
// "anything is here!"
// parcelId
// :
// "686ac42dac5e7af99a5d95be"
// paymentStatus
// :
// "paid"
// transactionId
// :
// "pi_3RhxYyReqW0qH7kw0A1h8OL8"
// _id
// :
