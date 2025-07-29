import React from "react";
import TinderCard from "react-tinder-card";
import "./CatSwiper.css";

function CatSwiper({ cats, onSwipe }) {
  return (
    <div className="cardContainer">
      {cats.map((url, index) => (
        <TinderCard
          key={url}
          onSwipe={(dir) => onSwipe(dir, url)}
          preventSwipe={["up", "down"]}
        >
          <div className="card">
            <img src={url} alt="cat" />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default CatSwiper;
