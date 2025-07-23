import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const ViewStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        toast.error("Failed to load story" , err);
      }
    };
    fetchStory();
  }, [axiosSecure, id]);

  if (!story) return <div className="text-white p-6">Loading story...</div>;

  return (
    <div className="min-h-screen bg-[#1f2a24] px-4 md:px-12 py-10 text-white">
      <div className="max-w-4xl mx-auto bg-[#2f3e36] border border-lime-400 rounded-lg p-6 shadow-lg">
        {/* Story Title */}
        <h1 className="text-3xl font-bold text-lime-300 mb-2">{story.title}</h1>

        {/* Creator and Date */}
        <div className="text-sm text-gray-400 mb-4">
          By <span className="text-lime-200">{story.email || "Unknown"}</span> •{" "}
          {format(new Date(story.createdAt), "PPpp")}
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Array.isArray(story.imageList) && story.imageList.length > 0 ? (
            story.imageList.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`story-${idx}`}
                className="w-full h-40 object-cover rounded border border-gray-600"
              />
            ))
          ) : (
            <img
              src={story.image}
              alt="single-img"
              className="w-full h-40 object-cover rounded border border-gray-600 col-span-full"
            />
          )}
        </div>

        {/* Story Text */}
        <p className="text-lg whitespace-pre-wrap">{story.story}</p>
      </div>
    </div>
  );
};

export default ViewStory;
