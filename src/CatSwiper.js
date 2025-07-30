// CatSwiper.js
import React from "react";
import { useSwipeable } from "react-swipeable";

function CatSwiper({ cat, onSwipe }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipe("left", cat),
    onSwipedRight: () => onSwipe("right", cat),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!cat) return null;

  return (
    <div className="flex justify-center">
      <div
        {...handlers}
        className="w-48 h-[85vw] sm:w-64 sm:h-[114vw] max-h-[80vh] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-center"
        style={{ aspectRatio: "9 / 16" }}
      >
        <img
          src={cat.url}
          alt={cat.name}
          className="w-full h-[85%] object-cover"
        />
        <p className="font-semibold text-sm mt-1">{cat.name}</p>
      </div>
    </div>
  );
}

export default CatSwiper;
