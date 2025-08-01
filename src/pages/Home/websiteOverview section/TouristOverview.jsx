import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaRegCompass,
  FaGlobeAsia,
  FaStar,
  FaUtensils,
  FaLightbulb,
} from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt size={28} className="text-[#4d6b57]" />,
    title: "Destination Insights",
    desc: "Explore information about famous destinations and hidden gems across Bangladesh."
  },
  {
    icon: <FaRegCompass size={28} className="text-[#4d6b57]" />,
    title: "Authentic Experiences",
    desc: "Immerse in rich culture, local festivals, and traditional lifestyles."
  },
  {
    icon: <FaUtensils size={28} className="text-[#4d6b57]" />,
    title: "Food & Cuisine",
    desc: "Discover regional flavors and where to find the best local eats."
  },
  {
    icon: <FaStar size={28} className="text-[#4d6b57]" />,
    title: "Hidden Gems",
    desc: "Uncover off-the-beaten-path natural wonders and quiet retreats."
  },
  {
    icon: <FaGlobeAsia size={28} className="text-[#4d6b57]" />,
    title: "Smart Travel Planning",
    desc: "Use our insights to plan personalized and efficient trips."
  },
  {
    icon: <FaLightbulb size={28} className="text-[#4d6b57]" />,
    title: "Traveler Tips",
    desc: "Practical advice on safety, budgeting, and local etiquette."
  },
];

const TouristOverview = () => {
  return (
    <section className="bg-[#eafff8] py-16 px-4 sm:px-10 md:px-20 lg:px-32 space-y-24">
      {/* Section 1: Intro */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-[#4d6b57]">The Tourist Guide</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Discover the beauty, culture, and history of Bangladesh with confidence — from iconic landmarks to rural charms.
        </p>
      </motion.div>

      {/* Section 2: Features */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl bg-white border border-green-400 shadow hover:shadow-md transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Section 3: Who It's For */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src="https://images.unsplash.com/photo-1620051525641-f1d65a8d032f?auto=format&fit=crop&w=800&q=80"
          alt="Bangladesh Travel"
          className="rounded-2xl shadow-xl"
        />
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Built for Every Kind of Explorer
          </h3>
          <ul className="text-gray-700 space-y-3 list-disc list-inside">
            <li><strong>Local travelers</strong> seeking new adventures</li>
            <li><strong>International tourists</strong> visiting Bangladesh</li>
            <li><strong>Backpackers</strong> wanting reliable insights</li>
            <li><strong>Travel agencies & bloggers</strong> needing curated data</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Whether chasing waterfalls or savoring biryani — we help you do it better.
          </p>
        </div>
      </motion.div>

      {/* Section 4: Culture Highlight */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-4 text-gray-800">
          Experience Culture, Not Just Places
        </h3>
        <p className="text-gray-600 text-lg">
          From the warmth of rural homes to the buzz of Dhaka — Bangladesh offers unforgettable stories and human connection.
        </p>
      </motion.div>

      {/* Section 5: What's Coming Next */}
      <motion.div
        className="bg-white border border-green-400 p-10 rounded-xl shadow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          What’s Coming Next?
        </h3>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-700 list-disc list-inside">
          <li>🗺️ Interactive destination map</li>
          <li>📋 Personalized itinerary builder</li>
          <li>🌐 Multilingual content</li>
          <li>⭐ User reviews and ratings</li>
          <li>📹 Virtual tours and drone views</li>
          <li>🤖 AI-based travel suggestions</li>
        </ul>
      </motion.div>

      {/* Section 6: CTA */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Explore?
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Join thousands using The Tourist Guide to plan their unforgettable trip.
        </p>
        <a
          href="/explore"
          className="bg-[#4d6b57] text-white px-6 py-3 rounded-xl shadow hover:bg-opacity-90 transition duration-200"
        >
          Start Exploring Now
        </a>
      </motion.div>
    </section>
  );
};

export default TouristOverview;
