import React, { useState, useEffect } from "react";
import CatSwiper from "./CatSwiper";
import Summary from "./Summary";

function App() {
  const [cats, setCats] = useState([]);
  const [liked, setLiked] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const results = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          fetch("https://cataas.com/cat?json=true").then((res) => res.json())
        )
      );
      setCats(results.map((cat) => `https://cataas.com/cat/${cat._id}`));
    };

    fetchCats();
  }, []);

  const handleSwipe = (direction, url) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, url]);
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= cats.length) {
      setShowSummary(true);
    }
  };

  return (
    <div className="app">
      <h1>Paws & Preferences 🐾</h1>
      {!showSummary ? (
        <CatSwiper cats={cats.slice(currentIndex)} onSwipe={handleSwipe} />
      ) : (
        <Summary likedCats={liked} />
      )}
    </div>
  );
}

export default App;
