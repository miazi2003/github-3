import React from "react";
import { FiMapPin, FiLink } from "react-icons/fi";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Phudu",
    url: "https://classy-praline-645446.netlify.app/",
    description: "A clean website for booking your doctor.",
  },
  {
    name: "Grape Task",
    url: "https://jolly-kitsune-272b49.netlify.app/",
    description: "A responsive web for Freelancers to get their task.",
  },
  {
    name: "Portfolio",
    url: "https://meek-kleicha-55e4bf.netlify.app/",
    description: "A responsive website of my profile.",
  },
  {
    name: "EduCamp",
    url: "https://teal-cendol-a8aa91.netlify.app/",
    description:
      "A responsive and clean website for students to prepare their ability to learn and get experience of assignment.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12 text-white bg-[#3B4E42] rounded-xl shadow-xl border border-green-400"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center text-green-300"
        variants={itemVariants}
      >
        Developer: Yeasin Miazi
      </motion.h1>

      <motion.div className="space-y-3 mb-10 text-lg" variants={itemVariants}>
        <p>
          <strong>📛 Name:</strong> Yeasin Miazi
        </p>
        <p>
          <strong>📞 Phone:</strong> 01608072719
        </p>
        <p>
          <strong>✉️ Email:</strong>{" "}
          <a
            className="text-green-300 underline hover:text-green-200 transition"
            href="mailto:yeasinmiazi1997@gmail.com"
          >
            yeasinmiazi1997@gmail.com
          </a>
        </p>
        <p>
          <strong>🔗 GitHub:</strong>{" "}
          <a
            className="text-green-300 underline hover:text-green-200 transition"
            href="https://github.com/miazi2003"
            target="_blank"
            rel="noreferrer"
          >
            github.com/miazi2003
          </a>
        </p>
        <p>
          <strong>💼 Profession:</strong> Full-stack Web Developer (React, Node.js,
          Firebase, etc.)
        </p>
        <p className="flex items-center gap-2 text-yellow-300">
          <FiMapPin size={20} /> Based in Bangladesh – Available for remote work
          worldwide
        </p>
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mb-6 text-green-200"
        variants={itemVariants}
      >
        🎯 Live Projects & Demos
      </motion.h2>

      <motion.div className="space-y-6" variants={containerVariants}>
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-[#4d6b57] border border-green-400 p-5 rounded-lg shadow-md hover:bg-[#5e806a] transition duration-300"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-green-100">
              <FiLink size={22} /> {project.name}
            </h3>
            <p className="mb-3 text-gray-100">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-green-200 underline hover:text-green-100"
            >
              {project.url.replace("https://", "")}
            </a>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 border-t border-green-300 pt-6 text-gray-100"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-3 text-green-200">📬 Let’s Connect</h2>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/miazi2003"
            className="text-green-300 underline hover:text-green-200 transition"
          >
            github.com/miazi2003
          </a>
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:yeasinmiazi1997@gmail.com"
            className="text-green-300 underline hover:text-green-200 transition"
          >
            yeasinmiazi1997@gmail.com
          </a>
        </p>
        <p>Phone: 016-0807-2719</p>
        <p className="mt-3 italic text-gray-300">
          Feel free to explore the projects above — I'd love to discuss any
          feedback, collaboration, or development opportunities! 😊
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
