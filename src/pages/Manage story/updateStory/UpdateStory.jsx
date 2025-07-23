import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const UpdateStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [storyData, setStoryData] = useState(null);
  const [newImage, setNewImage] = useState("");

  // Fetch story data
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/stories/${id}`);
        setStoryData(res.data);
      } catch (err) { 
        toast.error("Failed to fetch story" , err);
      }
    };
    fetchStory();
  }, [axiosSecure, id]);

  // Remove image (uses $pull in backend)
  const handleRemoveImage = async (imgUrl) => {
    try {
      await axiosSecure.patch(`/stories/remove-image/${id}`, {
        imageUrl: imgUrl,
        email: user?.email,
      });
      setStoryData({
        ...storyData,
        imageList: storyData.imageList.filter((img) => img !== imgUrl),
      });
      toast.success("Image removed");
    } catch {
      toast.error("Failed to remove image");
    }
  };

  // Add image (uses $push in backend)
  const handleAddImage = async () => {
    if (!newImage) return;
    try {
      await axiosSecure.patch(`/stories/add-image/${id}`, {
        imageUrl: newImage,
        email: user?.email,
      });
      setStoryData({
        ...storyData,
        imageList: [...storyData.imageList, newImage],
      });
      setNewImage("");
      toast.success("Image added");
    } catch {
      toast.error("Failed to add image");
    }
  };

  // Update title/story text
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, story } = storyData;
      await axiosSecure.put(`/stories/${id}`, { title, story, email: user?.email });
      toast.success("Story updated");
      navigate("/manage-stories");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!storyData) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 text-white bg-[#2f3e36]">
      <h1 className="text-3xl font-bold text-lime-300 mb-4">✏️ Edit Story</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <input
          type="text"
          value={storyData.title}
          onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
          placeholder="Title"
          className="w-full p-2 rounded bg-[#4d6b57] text-white"
        />
        <textarea
          value={storyData.story}
          onChange={(e) => setStoryData({ ...storyData, story: e.target.value })}
          placeholder="Your story..."
          rows={5}
          className="w-full p-2 rounded bg-[#4d6b57] text-white"
        />

        {/* Existing Images */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-lime-400">📷 Your Images</h2>
          <div className="grid grid-cols-2 gap-3">
            {storyData.imageList?.map((img, idx) => (
              <div key={idx} className="relative">
                <img src={img} alt="story" className="w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Image */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-lime-400 mb-1">➕ Add New Image URL</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Image URL"
              className="flex-1 p-2 rounded bg-[#4d6b57] text-white"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded"
        >
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdateStory;
