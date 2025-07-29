import React from "react";
import "./BrandLogo.css"
import { Link } from "react-router";
const BrandLogo = () => {


  return (
    <div>
        
      <Link to={"/"}>
      <div className="items-center flex flex-col">
       <h1 className="font-bold text-2xl logo-preview">ROAVIA</h1>
       <p className="text-xs">Explore Bangladesh</p>
      </div></Link>
    </div>
  );
};

export default BrandLogo;
