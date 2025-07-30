import React, { useEffect, useRef, useState } from "react";
import "../assets/css/bootstrap-icons.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/templatemo-tiya-golf-club.css";

function HeroSection() {
  const words = ["cute cats", "grumpy cats", "friendly cats", "playful cats"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 600); // match with CSS animation duration
    }, 2500);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <section
      className="hero-section d-flex justify-content-center align-items-center"
      id="section_1"
    >
      <div className="section-overlay"></div>

      {/* Top Wave SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#3D405B"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>

      <div className="container">
        <div className="row">
          {/* Text content */}
          <div className="col-lg-10 col-12 mb-5 mb-lg-0">
            <h2 className="text-white">Welcome to the cats dating app!</h2>

            <h1 className="cd-headline rotate-1 text-white mb-4 pb-2">
              <span>Enjoy connecting with </span>
              <span className="cd-words-wrapper">
                {words.map((word, index) => (
                  <b
                    key={word}
                    className={
                      index === currentWordIndex
                        ? isAnimating
                          ? "is-visible animating"
                          : "is-visible"
                        : "is-hidden"
                    }
                  >
                    {word}
                  </b>
                ))}
              </span>
            </h1>

            <div className="custom-btn-group">
              <a href="#section_2" className="btn custom-btn smoothscroll me-3">
                Our Story
              </a>
              <a href="#section_3" className="link smoothscroll">
                Become a member
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F4F1DE"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

export default HeroSection;
