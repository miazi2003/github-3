import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    onError: (err) => {
      toast.error("Failed to load users");
      console.error(err);
    },
  });

  // Handle role change
  const handleRoleChange = async (userEmail, currentRole) => {
    const newRole = currentRole === "admin" ? "tourist" : "admin";

    try {
      const res = await axiosSecure.put(`/users/role/${userEmail}`, { role: newRole });

      if (res.data.modifiedCount > 0) {
        toast.success(`User role changed to ${newRole}`);
        refetch();
      } else {
        toast.error("Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating role");
    }
  };

  if (isLoading) return <p className="text-white p-6">Loading users...</p>;
  if (isError) return <p className="text-red-500 p-6">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-[#3b4e42] min-h-screen text-white">
      <h1 className="text-3xl font-bold text-lime-300 mb-6">Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#4d6b57] border border-lime-400 text-sm">
            <thead>
              <tr className="bg-lime-400 text-black text-left">
                <th className="p-3">#</th>
                <th className="p-3">Email</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="border-t border-lime-300">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{user.userEmail || "N/A"}</td>
                  <td className="p-3">{user.name || "N/A"}</td>
                  <td className="p-3 capitalize">{user.role || "tourist"}</td>
                  <td className="p-3">
                    <button
                      disabled={
                        user.role === "admin" &&
                        users.filter((u) => u.role === "admin").length === 1
                      }
                      onClick={() => handleRoleChange(user.userEmail, user.role)}
                      className={`px-3 py-1 rounded ${
                        user.role === "admin"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white`}
                      title={`Make user ${user.role === "admin" ? "tourist" : "admin"}`}
                    >
                      {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
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

export default ManageUsers;
