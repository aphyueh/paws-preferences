import React from "react";
import TinderCard from "react-tinder-card";
import "./CatSwiper.css";

function CatSwiper({ cats, onSwipe }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      {cats.map((cat, index) => (
        <TinderCard
          key={cat.url}
          onSwipe={(dir) => onSwipe(dir, cat)}
          preventSwipe={["up", "down"]}
        >
          <div className="w-72 h-[400px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-center">
            <img src={cat.url} alt={cat.name} className="w-full h-3/4 object-cover" />
            <p className="font-semibold text-lg mt-2">{cat.name}</p>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default CatSwiper;
