import React, { useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import toast from "react-hot-toast";
import SquareImageUploader from "../SquareImageUploader";


const AddPackageForm = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const newPackage = {
      photo: uploadedImages[0], // Use the first uploaded image as main photo
      type: form.type.value,
      title: form.title.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      duration: form.duration.value,
      rating: parseFloat(form.rating.value),
      available: form.available.checked,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.post("/packages", newPackage);
      if (res.data.insertedId) {
        toast.success("✅ Package added successfully!");
        form.reset();
        setUploadedImages([]); // reset uploaded images
      }
    } catch (err) {
      toast.error("❌ Failed to add package.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#4d6b57]">
        Add New Tour Package
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <SquareImageUploader onUpload={(urls) => setUploadedImages(urls)} />
        </div>

        <input name="type" required placeholder="Type (e.g. Adventure)" className="input input-bordered w-full" />
        <input name="title" required placeholder="Package Title" className="input input-bordered w-full" />
        <input name="price" required type="number" placeholder="Price (BDT)" className="input input-bordered w-full" />
        <input name="location" required placeholder="Location" className="input input-bordered w-full" />
        <input name="duration" required placeholder="Duration (e.g. 3 Days 2 Nights)" className="input input-bordered w-full" />
        <input name="rating" required type="number" step="0.1" placeholder="Rating (e.g. 4.7)" className="input input-bordered w-full" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="available" className="checkbox" />
          Available
        </label>

        <textarea name="description" required placeholder="Description" className="textarea textarea-bordered col-span-full h-24"></textarea>

        <button
          type="submit"
          className="col-span-full bg-[#4d6b57] hover:bg-[#3e5447] text-white py-2 rounded-lg transition"
          disabled={loading || uploadedImages.length === 0}
        >
          {loading ? "Adding..." : "Add Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackageForm;
