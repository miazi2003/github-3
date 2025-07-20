import React from 'react';
import one from "../../../assets/one.jpg";
import two from "../../../assets/two.jpg";
import three from "../../../assets/three.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto overflow-x-hidden">
    <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={5000}>
  {/* Slide 1 */}
  <div className="h-[80vh] relative">
    <img src={one} alt="Slide 1" className="w-full h-full object-cover" />
    <div className="absolute bottom-10 left-0 pl-6 md:pl-20 pr-6 text-start z-20 max-w-2xl">
      <h1 className="font-bold text-white text-3xl md:text-5xl">
        Chase the Sunrise, Conquer the Unknown
      </h1>
      <p className="text-gray-300 mt-4 text-lg font-medium">
        Discover uncharted lands with <span className="text-white">ROAVIA</span> — adventure lives beyond the familiar.
      </p>
      <button className="mt-6 btn border border-white bg-transparent text-white hover:bg-white hover:text-black transition duration-300">
        Explore Packages
      </button>
    </div>
  </div>

  {/* Slide 2 */}
  <div className="h-[80vh] relative">
    <img src={two} alt="Slide 2" className="w-full h-full object-cover" />
    <div className="absolute bottom-10 left-0 pl-6 md:pl-20 pr-6 text-start z-20 max-w-2xl">
      <h1 className="font-bold text-white text-3xl md:text-5xl">
        Enjoy Your Tour<br />Travel Smarter with ROAVIA
      </h1>
      <p className="text-gray-300 mt-4 text-lg font-medium">
        Efficient, seamless, and reliable corporate travel solutions for global achievers.
      </p>
      <button className="mt-6 btn border border-white bg-transparent text-white hover:bg-white hover:text-black transition duration-300">
        Explore Packages
      </button>
    </div>
  </div>

  {/* Slide 3 */}
  <div className="h-[80vh] relative">
    <img src={three} alt="Slide 3" className="w-full h-full object-cover" />
    <div className="absolute bottom-10 left-0 pl-6 md:pl-20 pr-6 text-start z-20 max-w-2xl">
      <h1 className="font-bold text-white text-3xl md:text-5xl">
        Sail into Serenity, Find Your Escape
      </h1>
      <p className="text-gray-300 mt-4 text-lg font-medium">
        Let <span className="text-white">ROAVIA</span> guide you through nature’s hidden gems — peace awaits beyond the shores.
      </p>
      <button className="mt-6 btn border border-white bg-transparent text-white hover:bg-white hover:text-black transition duration-300">
        Explore Packages
      </button>
    </div>
  </div>
</Carousel>

    </div>
  );
};

export default Banner;
