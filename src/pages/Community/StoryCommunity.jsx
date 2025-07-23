import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import StoryCard from "./StoryCard";
import { toast } from "react-hot-toast";

const StoryCommunity = () => {
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get("/stories");
        setStories(res.data.reverse()); // Latest first
      } catch (err) {
        toast.error("Failed to load stories" , err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-[#1f2a24] px-4 md:px-12 py-10 text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-lime-300">🌍 Story Community</h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Explore stories shared by travelers across Bangladesh and beyond. Dive into their adventures, experiences, and moments!
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-300">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="text-center text-red-400">No stories found.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryCommunity;
