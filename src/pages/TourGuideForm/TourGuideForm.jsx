import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

const TourGuideForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    experience_years: "",
    photo: "",
    description: "",
    cvLink: "",
    cost: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      age,
      experience_years,
      photo,
      description,
      cvLink,
      cost,
    } = formData;


    if (

      !age ||
      !experience_years ||
      !photo ||
      !description ||
      !cvLink ||
      !cost
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const applicationData = {
      ...formData,
      name : user?.displayName,
      email : user?.email,
      age: parseInt(age),
      experience_years: parseInt(experience_years),
      cost: parseFloat(cost),
      tours_managed: [],
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/apply-guide", applicationData);
      console.log(res.data)
      if (res.data.insertedId) {
        toast.success("Application submitted!");
        setModalIsOpen(true);
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <Toaster position="top-center" />
      <div className="bg-[#4d6b57] border border-green-400 shadow-xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-200">Apply to Be a Tour Guide</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={user?.displayName}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={user?.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="number"
            name="age"
            placeholder="Your Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="number"
            name="experience_years"
            placeholder="Years of Experience"
            value={formData.experience_years}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="url"
            name="cvLink"
            placeholder="CV Link (URL)"
            value={formData.cvLink}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <input
            type="number"
            name="cost"
            placeholder="Tour Cost (USD)"
            value={formData.cost}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300"
          />
          <textarea
            name="description"
            placeholder="Your Bio or Experience..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-md border border-green-400 bg-[#4d6b57] text-white placeholder:text-gray-300 md:col-span-2"
          />

          <button
            type="submit"
            className="w-full md:col-span-2 bg-[#cccccc] text-black py-3 rounded-md font-semibold hover:brightness-95 transition"
          >
            Submit Application
          </button>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-md mx-auto mt-40 p-6 bg-white rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
      >
        <h3 className="text-2xl font-bold text-green-600 mb-2">Application Submitted!</h3>
        <p className="mb-4 text-gray-700">
          Your application has been successfully submitted. We will contact you once it's reviewed.
        </p>
        <button
          onClick={() => setModalIsOpen(false)}
          className="btn btn-success w-full"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default TourGuideForm;
