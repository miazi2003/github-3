// pages/AddStory.jsx
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SquareImageUploader from "../../Component/SquareImageUploader";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storyData = {
      title,
      story: storyText,
      imageList,
      email: user?.email,
    };

    try {
      await axiosSecure.post("/stories", storyData);
      toast.success("Story submitted successfully!");
      navigate("/manageStories");
      setTitle("");
      setStoryText("");
      setImageList([]);
    } catch (error) {
      console.error("Failed to save story", error);
      toast.error("Failed to submit story. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#3b4e42] text-white rounded-lg shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-4 text-lime-400">
        Share Your Travel Story
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Story Title"
          className="w-full p-3 rounded bg-[#4d6b57] border border-lime-300 placeholder:text-lime-200"
          required
        />

        <textarea
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          rows={5}
          placeholder="Share your experience..."
          className="w-full p-3 rounded bg-[#4d6b57] border border-lime-300 placeholder:text-lime-200"
          required
        />

<SquareImageUploader onUpload={(urls) => setImageList(urls)} />


        <button
          type="submit"
          className="bg-lime-400 text-[#3B4E42] font-semibold py-2 px-6 rounded hover:bg-lime-300 transition"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
