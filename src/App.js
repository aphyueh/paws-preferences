import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavbarWithSidebar from "./components/Navbar";
import Summary from "./Summary";
import "./assets/css/bootstrap-icons.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/templatemo-tiya-golf-club.css";

function App() {
  const [currentCat, setCurrentCat] = useState(null);
  const [nextCat, setNextCat] = useState(null);
  const [liked, setLiked] = useState([]);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catCounter, setCatCounter] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHolding, setIsHolding] = useState(false);
  const [isSwipingAway, setIsSwipingAway] = useState(false);
  const cardRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Fetch a single cat
  const fetchSingleCat = async (catNumber) => {
    try {
      const response = await fetch("https://cataas.com/cat/cute?json=true");
      const cat = await response.json();
      return {
        url: `https://cataas.com/cat/${cat.id}`,
        name: `Cat ${catNumber}`,
        id: cat.id
      };
    } catch (error) {
      console.error('Failed to fetch cat:', error);
      return null;
    }
  };

  // Load initial cats
  useEffect(() => {
    const loadInitialCats = async () => {
      setLoading(true);
      try {
        const [current, next] = await Promise.all([
          fetchSingleCat(1),
          fetchSingleCat(2)
        ]);
        setCurrentCat(current);
        setNextCat(next);
        setCatCounter(3);
      } catch (error) {
        console.error('Failed to load initial cats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialCats();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["section_1", "section_2", "section_3", "section_4"];
      const scrollPosition = window.scrollY + 95;

      sections.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const nextOffsetTop =
            index + 1 < sections.length
              ? document.getElementById(sections[index + 1])?.offsetTop || Infinity
              : Infinity;

          const navLinks = document.querySelectorAll(".click-scroll");
          if (scrollPosition >= offsetTop && scrollPosition < nextOffsetTop) {
            navLinks.forEach((link) => link.classList.remove("active"));
            if (navLinks[index]) navLinks[index].classList.add("active");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 94,
        behavior: "smooth",
      });
    }
  };
const handleSwipe = async (direction) => {
    if (!currentCat || isSwipingAway) return;
    
    // Add to history
    setSwipeHistory((prev) => [...prev, { ...currentCat, direction }]);

    if (direction === "right") {
      setLiked((prev) => [...prev, currentCat]);
    }

    // Set swiping away state
    setIsSwipingAway(true);
    
    // Start loading new cat immediately
    setLoading(true);
    const newCat = await fetchSingleCat(catCounter + 1);
    
    // Wait for swipe animation to complete
    setTimeout(() => {
      // Move next cat to current, and new cat to next
      setCurrentCat(nextCat);
      setNextCat(newCat);
      setCatCounter(prev => prev + 1);
      
      // Reset all states
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      setIsHolding(false);
      setIsSwipingAway(false);
      setLoading(false);
    }, 300);
  };

  // Handle mouse/touch start
  const handleStart = (e) => {
    if (isSwipingAway || loading) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    startPosRef.current = { x: clientX, y: clientY };
    
    holdTimeoutRef.current = setTimeout(() => {
      if (!isSwipingAway) {
        setIsHolding(true);
      }
    }, 100);
  };

  // Handle mouse/touch move
  const handleMove = (e) => {
    if (!isHolding || isSwipingAway || loading) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    
    setIsDragging(true);
    setDragOffset({ x: deltaX, y: deltaY });
  };

  // Handle mouse/touch end
  const handleEnd = (e) => {
    if (isSwipingAway || loading) return;
    
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    // Check for swipe (reduced threshold for easier swiping)
    if (isDragging && Math.abs(dragOffset.x) > 60) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      handleSwipe(direction);
      return;
    }

    // Reset states if no swipe
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setIsHolding(false);
  };

  const handleMouseLeave = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    if (!isSwipingAway && !loading) {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      setIsHolding(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => !isSwipingAway && !loading && handleSwipe("left"),
    onSwipedRight: () => !isSwipingAway && !loading && handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  // useEffect(() => {
  //   const fetchCats = async () => {
  //     setLoading(true);
  //     try {
  //       const results = await Promise.all(
  //         Array.from({ length: 10 }).map(() =>
  //           fetch("https://cataas.com/cat/cute?json=true").then((res) => res.json())
  //         )
  //       );
  //       setCats(
  //         results.map((cat, i) => ({
  //           url: `https://cataas.com/cat/${cat.id}`,
  //           name: `Cat ${i + 1}`, 
  //         }))
  //       );
  //     } catch (error) {
  //       console.error('Failed to fetch cats:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCats();
  // }, []);
  // Calculate card transform and styling
  const getCardStyle = (isNext = false) => {
    if (isNext) {
      return {
        transform: 'scale(0.95)',
        opacity: 0.8,
        transition: 'all 0.3s ease-out',
        zIndex: 1,
      };
    }

    if (isSwipingAway) {
      const swipeDirection = dragOffset.x > 0 ? 1 : (dragOffset.x < 0 ? -1 : 1);
      return {
        transform: `translateX(${swipeDirection * 400}px) rotate(${swipeDirection * 30}deg)`,
        opacity: 0,
        transition: 'all 0.3s ease-out',
        zIndex: 3,
      };
    }

    const rotation = dragOffset.x * 0.15;
    const opacity = Math.max(0.6, 1 - Math.abs(dragOffset.x) / 200);
    
    return {
      transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
      opacity: opacity,
      transition: isDragging ? 'none' : 'all 0.3s ease-out',
      cursor: isHolding ? 'grabbing' : 'grab',
      zIndex: 3,
    };
  };

  // Enhanced overlay styling
  const getOverlayStyle = () => {
    if (!isDragging && !isSwipingAway) return { display: 'none' };
    
    const intensity = Math.min(Math.abs(dragOffset.x) / 100, 1);
    
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: `${2 + intensity * 2}rem`,
      opacity: intensity,
      zIndex: 4,
      pointerEvents: 'none',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      transition: isDragging ? 'none' : 'all 0.3s ease-out',
    };
  };

  if (loading && !currentCat) {
    return (
      <div id="section_2" className="events-section section-bg section-padding"
           style={{ backgroundColor: "#F4F1DE" }}>
        <div className="container" style={{ backgroundColor: "#F4F1DE" }}>
          <div className="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
            <h2><span>LOADING</span> CATS</h2>
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCat) {
    return (
      <div id="section_2" className="events-section section-bg section-padding"
           style={{ backgroundColor: "#F4F1DE" }}>
        <div className="container" style={{ backgroundColor: "#F4F1DE" }}>
          <div className="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
            <h2><span>NO</span> CATS AVAILABLE</h2>
          </div>
          <p className="text-center mb-0">Unable to load cats 😿</p>
        </div>
      </div>
    );
  }


  return (
    <div >
      <NavbarWithSidebar
        scrollToSection={scrollToSection}
      />
      <div id="section_1">
        <HeroSection />
      </div>

      <div id="section_2" class="events-section section-bg section-padding"
        style={{ backgroundColor: "#F4F1DE" }}>

        <div className="container" style={{ backgroundColor: "#F4F1DE" }}>
          <div class="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
            <h2><span>START</span> SWIPING</h2>
          </div>

          <div class="col-lg-6 col-12 text-center mb-3 mb-lg-0">
            <h4 class="mb-4 pb-lg-2">Hold and drag left to 💔, right to ❤️</h4>
          </div>
          <div {...handlers} className="d-flex justify-content-center align-items-center">
          <div style={{ position: 'relative', width: '400px', height: '600px' }}>
            
            {/* Next cat card (underneath) */}
            {nextCat && (
              <Card
                className="w-full shadow-md select-none"
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  maxWidth: '50vw',
                  maxHeight: '100vh',
                  width: '400px',
                  height: '600px',
                  ...getCardStyle(true),
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none'
                }}
              >
                <CardImg
                  top
                  src={nextCat.url}
                  alt={nextCat.name}
                  className="w-full object-cover rounded-t"
                  draggable={false}
                  style={{ 
                    height: 'calc(100% - 60px)', 
                    maxHeight: 'calc(100vh - 100px)', 
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
                <CardBody className="p-4">
                  <CardTitle tag="h5" className="font-semibold text-sm text-center">
                    {nextCat.name}
                  </CardTitle>
                </CardBody>
              </Card>
            )}

            {/* Current cat card (on top) */}
            <Card
              ref={cardRef}
              className={`w-full shadow-md select-none ${loading ? 'opacity-75' : ''}`}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                maxWidth: '50vw',
                maxHeight: '100vh',
                width: '400px',
                height: '600px',
                ...getCardStyle(),
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: loading ? 'none' : 'auto'
              }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            >
              <CardImg
                top
                src={currentCat.url}
                alt={currentCat.name}
                className="w-full object-cover rounded-t"
                draggable={false}
                style={{ 
                  height: 'calc(100% - 60px)', 
                  maxHeight: 'calc(100vh - 100px)', 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'none'
                }}
              />
              <CardBody className="p-4">
                <CardTitle tag="h5" className="font-semibold text-sm text-center">
                  {currentCat.name}
                </CardTitle>
              </CardBody>
              
              {/* Overlay for visual feedback */}
              <div style={getOverlayStyle()}>
                {dragOffset.x > 0 ? '❤️' : '💔'}
              </div>

              {/* Loading overlay */}
              {loading && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5,
                  borderRadius: '0.375rem'
                }}>
                  <div className="text-center">
                    <div className="spinner-border text-primary mb-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading next cat...</div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F4F1DE"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>

      <div id="section_3">
        
        <Summary likedCats={liked} />
      </div>

      <div class="container">
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Swipe History</h2>
          {swipeHistory.length > 0 ? (
            <div className="table-responsive">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th style={{width: '10%'}}></th>
                    <th style={{width: '60%'}}>Name</th>
                    <th style={{width: '30%'}}>Feeling</th>
                  </tr>
                </thead>
                <tbody>
                  {swipeHistory.map((cat, index) => (
                    <tr key={index}>
                      <td>
                        <img 
                          src={cat.url} 
                          alt={cat.name}
                          className="rounded-circle"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover'
                          }}
                        />
                      </td>
                      <th scope="row" className="text-start align-middle">
                        {cat.name}
                      </th>
                      <td className="align-left">
                        {cat.direction === "right" ? (
                          <i className="bi-check-circle-fill text-success fs-5"></i>
                        ) : (
                          <i className="bi-x-circle-fill text-danger fs-5"></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No cats swiped yet! Start swiping to see your history.</p>
          )}
        </div>
      </div>
      <div id="section_4">
        <Footer />
      </div>
      
    </div>
    
  );
}

export default App;
