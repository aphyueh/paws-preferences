import React from "react";

function Summary({ likedCats }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>You liked {likedCats.length} cat{likedCats.length !== 1 ? "s" : ""}!</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {likedCats.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`liked-cat-${index}`}
            style={{ width: "150px", height: "150px", objectFit: "cover", margin: "10px", borderRadius: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default Summary;
