import React, { useState, useEffect } from "react";
import CatSwiper from "./CatSwiper";
import Summary from "./Summary";
import "./index.css";


function App() {
  const [cats, setCats] = useState([]);
  const [liked, setLiked] = useState([]);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [showSwiper, setShowSwiper] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      const results = await Promise.all(
        Array.from({ length: 20 }).map(() =>
          fetch("https://cataas.com/cat?json=true").then((res) => res.json())
        )
      );
      setCats(
        results.map((cat, i) => ({
          url: `https://cataas.com/cat/${cat._id}`,
          name: `Captain Whiskers ${i + 1}`, 
        }))
      );
    };

    fetchCats();
  }, []);

  const handleSwipe = (direction, cat) => {
    setSwipeHistory((prev) => [...prev, { ...cat, direction }]);

    if (direction === "right") {
      setLiked((prev) => [...prev, cat]);
    }

    if (swipeHistory.length + 1 >= cats.length) {
      setShowSwiper(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Paws & Preferences 🐾</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowSwiper(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
        >
          Start Purring 😽
        </button>
      </div>

      {showSwiper && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setShowSwiper(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <CatSwiper cats={cats} onSwipe={handleSwipe} />
          </div>
        </div>
      )}

      <Summary likedCats={liked} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Swipe History</h2>
        <ul className="max-w-md mx-auto space-y-1 text-sm text-gray-700">
          {swipeHistory.map((cat, index) => (
            <li key={index}>
              {cat.name}: {cat.direction === "right" ? "❤️ Liked" : "💔 Disliked"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
