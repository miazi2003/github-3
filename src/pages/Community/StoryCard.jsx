import React from "react";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2f3e36] border border-lime-400 rounded-lg shadow-md p-4 text-white">
      {/* Multiple Images */}
      <div className="flex gap-2 overflow-x-auto mb-3">
        {Array.isArray(story.imageList) && story.imageList.length > 0 ? (
          story.imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`story-img-${idx}`}
              className="h-28 w-40 object-cover rounded border border-gray-600"
            />
          ))
        ) : (
          <img
            src={story.image}
            alt="fallback"
            className="h-28 w-full object-cover rounded border border-gray-600"
          />
        )}
      </div>

      {/* Story Title */}
      <h2 className="text-xl font-bold text-lime-300 truncate">{story.title}</h2>

      {/* Creator Email */}
      <p className="text-sm text-gray-300 mt-1 break-all">
        📧 <span className="text-lime-200">{story.email || "Unknown"}</span>
      </p>

      {/* Created At */}
      <p className="text-xs text-gray-400 mt-1">
        🕒 {format(new Date(story.createdAt), "PPpp")}
      </p>

      {/* View Button */}
      <Link to={`/viewStory/${story._id}`}>
      <button
        onClick={() => navigate(`/view-story/${story._id}`)}
        className="mt-4 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black rounded font-semibold"
      >
        View Story
      </button></Link>
    </div>
  );
};

export default StoryCard;
