import React from "react";

const GoalCard = ({ amount, type, title }) => {
  return (
    <div className="flex flex-col justify-center p-6 bg-gradient-to-b from-[#E3FED8]/80 to-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:drop-shadow-[0_2px_7px_rgba(225,252,228,0.5)] hover:-translate-y-1 transition hover:delay-75 border-2 border-[#9FE598] text-center">
      <h5 className="mb-2 text-2xl tracking-tight text-gray-700">{title}</h5>
      <div className="flex items-center justify-center">
        <p className="text-[#727272] z-1 px-4">
          {amount} {type}
        </p>
      </div>
    </div>
  );
};

export default GoalCard;
