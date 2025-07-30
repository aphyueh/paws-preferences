
import React , { useEffect , useRef , useState , useSwipeable } from "react";
function CatGallery({ cats, setSelectedCat, setShowSwiper }) {
  const containerRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setFocusedIndex(index);
          }
        });
      },
      { root: containerRef.current, threshold: 0.6 }
    );

    const cards = containerRef.current?.querySelectorAll(".cat-card");
    cards?.forEach((card) => observer.observe(card));

    return () => cards?.forEach((card) => observer.unobserve(card));
  }, [cats]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-4 pb-6"
    >
      {cats.slice(0, 10).map((cat, index) => (
        <div
          key={cat.url}
          data-index={index}
          className={`cat-card cursor-pointer relative flex-shrink-0 w-72 h-96 snap-center rounded-xl overflow-hidden shadow-lg transition-transform duration-300 
            ${focusedIndex === index ? "scale-105 z-10" : "scale-95 opacity-80"}`}
          onClick={() => {
            setSelectedCat(cat);
            setShowSwiper(true);
          }}
        >
          <img
            src={cat.url}
            alt={cat.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
            {cat.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CatGallery;
