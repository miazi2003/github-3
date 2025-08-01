import React, { useEffect } from "react";
import { Link } from "react-router"; // fix: use react-router-dom
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLongArrowAltRight } from "react-icons/fa";

import pic1 from "../../../assets/tour1.jpg";
import pic2 from "../../../assets/tour2.jpg";
import pic3 from "../../../assets/tour3.jpg";
import pic4 from "../../../assets/tour4.jpg";

const HomeOverview = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="lg:flex flex-col md:flex-row   justify-between mt-1 bg-[#3B4E42]  max-w-7xl mx-auto">
      <div className=" md:w-[40%] flex items-center justify-center lg:p-1 p-4">
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white py-1 px-1 rounded" data-aos="fade-down-right">
              <img src={pic1} alt="Tour 1" className="h-32 w-full object-cover rounded" />
            </div>
            <div className="bg-white py-1 px-1 rounded" data-aos="fade-down-left">
              <img src={pic2} alt="Tour 2" className="h-32 w-full object-cover rounded" />
            </div>
            <div className="bg-white py-1 px-1 rounded" data-aos="fade-up-right">
              <img src={pic3} alt="Tour 3" className="h-32 w-full object-cover rounded" />
            </div>
            <div className="bg-white py-1 px-1 rounded" data-aos="fade-up-left">
              <img src={pic4} alt="Tour 4" className="h-32 w-full object-cover rounded" />
            </div>
          </div>
        </section>
      </div>

      <div className="md:w-[60%] mx-auto lg:p-10 p-4 rounded-xl text-center text-gray-200">
        <h2 className="text-4xl font-extrabold mb-4 text-white inline-block relative">
          Why Explore with <span className="text-gray-300">ROAVIA</span>
          <span className="block h-1 w-28 rounded-full mx-auto mt-2 bg-gray-300 opacity-80"></span>
        </h2>
        <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
          Unlock the true beauty of your travel destinations with ROAVIA’s expertly curated guides and exclusive experiences. Discover more, explore deeper, and travel smarter.
        </p>
        <div className="w-full flex items-center justify-center">
          <Link to="/overview">
            <button className="flex items-center gap-4 px-12 py-4 font-semibold text-gray-300 rounded-lg border-2 border-gray-300 hover:bg-gray-300 hover:text-[#3b4e42] transition duration-300">
              See Overview <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
