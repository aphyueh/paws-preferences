import React, { useState }  from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


function Summary({ likedCats = []}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCat = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === likedCats.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCat = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? likedCats.length - 1 : prevIndex - 1
    );
  };

  // If no cats are liked, show a message
  if (likedCats.length === 0) {
    return (
      <div className="container">
        <h2 className="text-xl font-semibold">Let's review ...</h2>
        <div className="w-full flex justify-center mt-3">
          <div className="custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0">
            <h6 className="custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0">0</h6>
            <strong className="text-white">No cats caught your attention yet!</strong>
          </div>
        </div>
      </div>
    );
  }

  const currentCat = likedCats[currentIndex];

  return (
    <div class="container">
      <h2 className="text-xl font-semibold">Let's review ...</h2>
        <div class="w-full flex justify-center mt-3">
            <div class="custom-block-date-wrap d-flex d-lg-block d-md-block align-items-center mt-3 mt-lg-0 mt-md-0 mb-10">
                <h6 class="custom-block-date mb-lg-1 mb-0 me-3 me-lg-0 me-md-0">{likedCats.length}</h6>
                
                <strong class="text-white">Cat(s) caught your attention!</strong>
            </div>
        </div>

        <div className="row custom-block custom-block-bg position-relative">
        {/* Navigation Arrows */}
        {likedCats.length > 1 && (
          <>
            <button 
              onClick={prevCat}
              className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: '50px', 
                height: '50px', 
                zIndex: 10, 
                left: '10px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              aria-label="Previous cat"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextCat}
              className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: '50px', 
                height: '50px', 
                zIndex: 10, 
                right: '10px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              aria-label="Next cat"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Current Cat Display */}
        <div className="col-lg-4 col-md-8 col-12 order-1 order-lg-0">
          <div className="custom-block-image-wrap">
            <img 
              src={currentCat.url} 
              className="custom-block-image img-fluid" 
              alt={currentCat.name || 'Cat'}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="col-lg-6 col-12 order-3 order-lg-0">
          <div className="custom-block-info mt-2 mt-lg-0">
            <h3 className="mb-3 font-semibold">{currentCat.name || 'Adorable Cat'}</h3>
            
            <p className="mb-0">{currentCat.bio || 'A wonderful feline companion looking for love and attention.'}</p>

            <div className="d-flex flex-wrap border-top mt-4 pt-3">
              <div className="mb-4 mb-lg-0">
                <div className="d-flex flex-wrap align-items-center mb-1">
                  <span className="custom-block-span">Interest:</span>
                  <p className="mb-0">{currentCat.interest || 'Playing, napping, and getting treats'}</p>
                </div>

                <div className="d-flex flex-wrap align-items-center">
                  <span className="custom-block-span">Gender:</span>
                  <p className="mb-0">{currentCat.gender || 'Unknown'}</p>
                </div>
              </div>

              <div className="d-flex align-items-center ms-lg-auto">
                <a href="event-detail.html" className="btn custom-btn">Say meow</a>
              </div>
            </div>

            {/* Gallery Indicator */}
            {likedCats.length > 1 && (
              <div className="text-center mt-3">
                <small className="text-muted">
                  {currentIndex + 1} of {likedCats.length}
                </small>
                <div className="d-flex justify-content-center mt-2 gap-2">
                  {likedCats.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`rounded-circle border-0 ${
                        index === currentIndex ? 'bg-primary' : 'bg-secondary'
                      }`}
                      style={{ 
                        width: '8px', 
                        height: '8px',
                        opacity: index === currentIndex ? 1 : 0.5
                      }}
                      aria-label={`Go to cat ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
