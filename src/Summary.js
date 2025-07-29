import React from "react";

function Summary({ likedCats }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">You liked {likedCats.length} cat(s)!</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {likedCats.map((cat, index) => (
          <div key={index} className="m-2 text-center">
            <img
              src={cat.url}
              alt={cat.name}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
            <p className="mt-1 text-sm">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
