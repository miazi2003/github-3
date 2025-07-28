import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const ManageStories = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get("/stories");
        setStories(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load stories");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this story?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/stories/${id}?email=${user?.email}`);
      if (res.data?.deletedCount > 0) {
        setStories((prev) => prev.filter((story) => story._id !== id));
        toast.success("🗑️ Story deleted successfully");
      } else {
        toast.error("❌ Failed to delete the story");
      }
    } catch (err) {
      console.log(err);
      toast.error("❌ Something went wrong while deleting");
    }
  };

  if (loading) {
    return <p className="text-white">Loading stories...</p>;
  }

  return (
    <div className="p-6 text-white bg-[#3b4e42] min-h-screen">
      <h1 className="text-3xl text-lime-300 font-bold mb-6">📖 Manage Stories</h1>

      {stories.length === 0 ? (
        <p className="text-white">No stories found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-[#4d6b57] p-4 rounded-lg shadow-lg border border-lime-400"
            >
              {/* Multiple images */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Array.isArray(story.imageList) &&
                  story.imageList.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`story-img-${index}`}
                      className="h-24 w-full object-cover rounded"
                    />
                  ))}
              </div>

              <h2 className="text-xl font-semibold text-lime-300">
                {story.title || "Untitled"}
              </h2>
              <p className="text-sm mt-2 break-all">{story.story}</p>
              <p className="text-sm mt-2 break-all italic">{story.email}</p>

              {/* Buttons */}
              {story.email === user?.email && (
                <div className="flex gap-2 mt-4">
                  <Link to={`/update-story/${story._id}`}>
                    <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;
