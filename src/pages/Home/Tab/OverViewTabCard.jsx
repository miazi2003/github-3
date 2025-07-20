import React from "react";

const OverViewTabCard = ({data}) => {
  return (
    <div>
      <div className="max-w-sm w-full bg-[#4d6b57] border border-green-400 shadow-[0_0_10px_rgba(100,255,100,0.2)] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(100,255,100,0.4)] transition-shadow duration-300">
        <img
          src={data.photo}
          alt="Tour"
          className="w-full h-48 object-cover"
        />
        <div className="p-5 text-green-100 space-y-2">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm">
            Type: <span className="font-medium text-white">{data.type}</span>
          </p>
          <p className="text-sm">
            Price:{" "}
            <span className="font-semibold text-lime-300">${data.price}</span>
          </p>
          <div className="pt-3">
            <button className="w-full bg-lime-400 text-[#3B4E42] font-semibold py-2 rounded-md hover:bg-lime-300 transition-colors duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewTabCard;
