import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-hot-toast";
import StoryCard from "../Community/StoryCard";

const TourGuideProfile = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const [guide, setGuide] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuideAndStories = async () => {
      try {
        const guideRes = await axiosSecure.get(`/guides/${email}`);
        const storiesRes = await axiosSecure.get("/stories");
        const filteredStories = storiesRes.data.filter(story => story.email === email);

        setGuide(guideRes.data);
        setStories(filteredStories);
      } catch (err) {
        toast.error("Failed to load profile or stories" , err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideAndStories();
  }, [axiosSecure, email]);

  if (loading) return <div className="text-white p-6">Loading guide profile...</div>;
  if (!guide) return <div className="text-red-400 p-6">Tour guide not found.</div>;

  return (
    <div className="min-h-screen bg-[#1f2a24] px-4 md:px-12 py-10 text-white">
      {/* Profile Section */}
      <div className="bg-[#2f3e36] border border-lime-400 rounded-lg shadow-md p-6 mb-10 max-w-4xl mx-auto text-center">
        <img
          src={guide.photo}
          alt={guide.name}
          className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-lime-400"
        />
        <h1 className="text-2xl font-bold text-lime-300 mt-4">{guide.name}</h1>
        <p className="text-sm text-gray-400">{guide.email}</p>

        <p className="text-gray-300 mt-3">{guide.description || "No description available."}</p>

        <div className="mt-4 text-sm text-gray-300 space-y-1">
          <p>🎂 Age: <span className="text-lime-300">{guide.age}</span></p>
          <p>🗓️ Experience: <span className="text-lime-300">{guide.experience_years} years</span></p>
          <p>💰 Cost per Tour: <span className="text-lime-300">${guide.cost}</span></p>
        </div>

        {guide.tours_managed?.length > 0 && (
          <div className="mt-5 text-left">
            <h3 className="text-lg font-semibold text-lime-400 mb-2">🧭 Tours Managed:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {guide.tours_managed.map((tour, index) => (
                <li key={index}>✅ {tour}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
             <p className="mt-4">To Book Our Guide : <span className="text-lime-300">Get A Tour Package And Choose The Guide</span></p>
        </div>
      </div>

      {/* Story Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-lime-300">📖 Stories by {guide.name}</h2>
        {stories.length === 0 && (
          <p className="text-gray-400 mt-2">This guide hasn't shared any stories yet.</p>
        )}
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default TourGuideProfile;
