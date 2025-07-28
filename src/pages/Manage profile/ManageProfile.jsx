import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";



import useAuth from "../../hook/useAuth";
import SquareImageUploader from "../../Component/SquareImageUploader";
import useAxiosSecure from "../../hook/useAxiosSecure";
import StatCards from "../admin state/Statcards";


const ManageProfile = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure()

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        image: userData.image || user?.photoURL || "",
      });
    }
  }, [userData , user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/users/${userData._id}`, formData);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-4 bg-[#4d6b57] min-h-screen text-white">
      <div className="border border-green-400 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Welcome, {userData?.name}!</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={userData?.image || user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-400 object-cover"
          />
          <div>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {userData?.role}</p>
            <p><span className="font-semibold">Phone:</span> {userData?.phone}</p>
            <p><span className="font-semibold">Address:</span> {userData?.address}</p>
          </div>
        </div>

        {userData?.role === "admin" && <StatCards/> }

        {userData?.role === "tourist" && (
          <div className="pt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded shadow"
              onClick={() => window.location.href = "/join-guide"}
            >
              Apply as Tour Guide
            </button>
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#4d6b57] border border-green-400 rounded-lg p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
            <SquareImageUploader
              onUpload={(urls) => setFormData({ ...formData, image: urls[0] })}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-green-400 bg-[#4d6b57] text-white"
              placeholder="Name"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-green-400 bg-[#4d6b57] text-white"
              placeholder="Phone"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-green-400 bg-[#4d6b57] text-white"
              placeholder="Address"
            />
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ManageProfile;
