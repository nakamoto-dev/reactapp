// Card.js
import React from 'react';
const screenHeight = window.innerHeight;
const cardHeight = screenHeight/8;

const Card = ({ icon, title, value }) => {
  return (
    <div style={{borderRadius:50+'px', height:cardHeight}} className="flex flex-col bg-blue-200 hover:bg-blue-800 hover:text-white shadow-lg w-full mx-1 my-2 p-4">
      {/* Title Row - Full width */}
      <div className="w-full mb-2 text-center">
        <div className="text-sm font-semibold">{title}</div>
      </div>

      {/* Icon and Value Row - Divided into two columns */}
      <div className="flex">
        {/* Icon - Centered vertically */}
        <div className="flex flex-col items-center justify-center w-1/2">
          {icon}
        </div>

        {/* Value - Centered vertically */}
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
