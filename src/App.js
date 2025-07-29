import React, { useEffect, useState } from 'react';

function App() {
  const [cats, setCats] = useState([]);
  const [liked, setLiked] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchCats = async () => {
      const urls = [];
      for (let i = 0; i < 10; i++) {
        const res = await fetch('https://cataas.com/cat?json=true');
        const data = await res.json();
        urls.push(`https://cataas.com${data.url}`);
      }
      setCats(urls);
    };
    fetchCats();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') setLiked([...liked, cats[index]]);
    setIndex(index + 1);
  };

  if (index >= cats.length) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">You liked {liked.length} cats!</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {liked.map((url, i) => (
            <img key={i} src={url} alt="liked cat" className="w-32 h-32 object-cover rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Paws & Preferences</h1>
      <div className="relative w-72 h-72">
        <img
          src={cats[index]}
          alt="cat"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-6 flex gap-6">
        <button
          onClick={() => handleSwipe('left')}
          className="px-6 py-2 bg-red-400 text-white rounded-lg shadow-md"
        >
          Dislike
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md"
        >
          Like
        </button>
      </div>
    </div>
  );
}

export default App;
