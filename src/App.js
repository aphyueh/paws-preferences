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

  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Fetch a single cat
  const fetchSingleCat = async (catNumber) => {
    const catNames = [
      "Whiskers", "Mochi", "Luna", "Simba", "Neko", "Mittens",
      "Shadow", "Oreo", "Pumpkin", "Miso", "Tuna", "Cleo", "Chai"
    ];
    const genders = ["Male", "Female"];
    const interests = [
      "Climbing curtains",
      "Chasing laser pointers",
      "Knocking things off shelves",
      "Bird watching",
      "Sleeping in boxes",
      "Hunting socks",
      "Sunbathing",
      "Playing with yarn",
      "Zooming at 3AM",
      "Eating tuna"
    ];

    const bios = [
      "A curious cat who loves adventure.",
      "Professional napper and full-time floof.",
      "Purring therapist available 24/7.",
      "Came for the snacks, stayed for the cuddles.",
      "Likes long walks on the windowsill.",
      "Fierce, fabulous, and a little bit feral.",
      "Pawsitively charming and dangerously cute.",
      "Your future best friend with whiskers."
    ];

    try {
      const response = await fetch("https://cataas.com/cat/cute?json=true");
      const cat = await response.json();
      return {
        url: `https://cataas.com/cat/${cat.id}`,
        name: randomChoice(catNames),
        bio: randomChoice(bios),
        interest: randomChoice(interests),
        gender: randomChoice(genders),
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

const handleSwipe = async (direction) => {
    if (!currentCat || isSwipingAway) return;
    
    // Add to history
    setSwipeHistory((prev) => [...prev, { ...currentCat, direction }]);

    if (direction === "right") {
      setLiked((prev) => [...prev, currentCat]);
    }

    // Set swiping away state
    setIsSwipingAway(true);
    
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
    }, 200);
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

  const getCardStyle = (isNext = false) => {
    if (isNext) {
      return {
        transform: isSwipingAway ? 'scale(1)' : 'scale(0.95)',
        opacity: isSwipingAway ? 1 : 0.8,
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
      transition: 'none',
      cursor: isHolding ? 'grabbing' : 'grab',
      zIndex: 3,
    };
  };

  // Enhanced overlay styling
  const getOverlayStyle = () => {
    if (!isDragging && !isSwipingAway) return { display: 'none' };
    
    const intensity = Math.min(Math.abs(dragOffset.x) / 100, 1);
    const isLike = dragOffset.x > 0;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isLike ? 'rgba(255, 0, 128, 0.48)' : 'rgba(10, 77, 10, 0.48)', // Bright pink for like, dark green for dislike
      opacity: intensity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      color: 'white',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      pointerEvents: 'none',
      borderRadius: '0.375rem',
     
    };
  };

  return (
    <div >
      <NavbarWithSidebar
        scrollToSection={scrollToSection}
      />  
      <div id="section_1">
        <HeroSection />
      </div>

      <div id="section_2" class="events-section section-bg section-padding" style={{ backgroundColor: "#F4F1DE" }}>

        <div className="container" style={{ backgroundColor: "#F4F1DE" }}>

          <div class="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
            <h2><span>START</span> PURRING</h2>
          </div>

          <div class="col-12 text-center mb-3 mb-lg-0">
            <h4 class="mb-4 pb-lg-2">Hold & swipe left to dislike, right to like the cats!</h4>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              {/* Animated paw prints - Left side */}
              <div style={{
                position: 'absolute',
                left: 'calc(50% - 300px)',
                top: '0',
                height: '600px',
                width: '80px',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`left-${i}`}
                    style={{
                      position: 'absolute',
                      fontSize: '36px',
                      opacity: 0.3,
                      animation: `pawWalkUp 6s infinite linear`,
                      animationDelay: `${i * 0.8}s`,
                      left: i % 2 === 0 ? '0px' : '40px',
                      bottom: `-40px`,
                      transform: 'rotate(-15deg)'
                    }}
                  >
                    💔
                  </div>
                ))}
              </div>

              {/* Animated paw prints - Right side */}
              <div style={{
                position: 'absolute',
                right: 'calc(50% - 300px)',
                top: '0',
                height: '600px',
                width: '80px',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`right-${i}`}
                    style={{
                      position: 'absolute',
                      fontSize: '36px',
                      opacity: 0.3,
                      animation: `pawWalkUp 6s infinite linear`,
                      animationDelay: `${i * 0.8}s`,
                      left: i % 2 === 0 ? '40px' : '0px',
                      bottom: `-40px`,
                      transform: 'rotate(15deg)'
                    }}
                  >
                    ❤️
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div {...handlers} className="d-flex justify-content-center align-items-center">
            <div style={{ position: 'relative', width: '400px', height: '600px' }}> 
              {/* Next cat card (underneath) */}
              {nextCat && nextCat.url && (
                <Card
                  className="w-full shadow-md select-none"
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
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
              <div style={{ position: 'relative', height: '100%' }}>                
                <CardImg
                  top
                  src={nextCat.url}
                  alt={nextCat.name || 'Cat'}
                  className="w-full h-full object-cover rounded-t"
                  draggable={false}
                  style={{ 
                    height: '100%', 
                    width: '100%',
                    maxHeight: '100vh', 
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none',
                    objectFit: 'cover'

                  }}
                />
                {/* Floating cat name */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                  {nextCat.name || 'Cat'}
                  </div>
                </div>
              </Card>
            )}

            {/* Current cat card (on top) */}
            {currentCat && currentCat.url && (
            <Card
              ref={cardRef}
              className={`w-full shadow-md select-none ${loading ? 'opacity-75' : ''}`}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
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
              <div style={{ position: 'relative', height: '100%' }}>  
                <CardImg
                  top
                  src={currentCat.url}
                  alt={currentCat.name}
                  className="w-full object-cover rounded-t"
                  draggable={false}
                  style={{ 
                    width: '100%',
                    height: '100%', 
                    maxHeight: '100vh', 
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    pointerEvents: 'none',
                    objectFit: 'cover'
                  }}
                />
                  {/* Floating cat name */}
                  <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                    {currentCat.name}
                  </div>
                {/* Overlay for visual feedback */}
                <div style={getOverlayStyle()}>
                  {dragOffset.x > 0 ? '❤️' : '💔'}
                </div>
              </div>
            </Card>
            )}
          </div>
        </div>
      </div>
      {/* CSS Animation Styles */}
        <style jsx>{`
          @keyframes pawWalkUp {
            0% {
              bottom: -40px;
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              bottom: calc(100% + 40px);
              opacity: 0;
            }
          }
        `}</style>
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

      <div class="container mt-10 mb-5">
        <div className="mt-8">
          <h2 className="text-xl font-semibold mt-5 mb-4 text-center">Swipe History</h2>
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
      <div className="container mb-5">
      <div className="col-lg-5 col-12 mx-auto" id="section_4">
        <h4 className="mb-4 pb-lg-2">Please join us!</h4>
        <form
          action="#"
          method="post"
          className="custom-form membership-form shadow-lg"
          role="form"
        >
          <h4 className="text-white mb-4">Become a member</h4>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="full-name"
              id="full-name"
              className="form-control"
              placeholder="Full Name"
              required
            />
            <label htmlFor="full-name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              id="email"
              pattern="[^ @]*@[^ @]*"
              className="form-control"
              placeholder="Email address"
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="message"
              name="message"
              placeholder="Describe message here"
            />
            <label htmlFor="message">Comments</label>
          </div>

          <button type="submit" className="form-control">
            Submit
          </button>
        </form>
      </div>
      </div>
      
      {/* Footer */}

      <div id="section_5">
        <Footer />
      </div>
      
    </div>
    
  );
}

export default App;
