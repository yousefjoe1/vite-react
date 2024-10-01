import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    verified: true,
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
  },
  {
    id: 4,
    name: "Emma R.",
    rating: 4,
    text: "Shop.co has become my go-to for fashionable and affordable clothing. The quality is consistently good, and their customer service is top-notch.",
    verified: true,
  },
  {
    id: 5,
    name: "Michael P.",
    rating: 5,
    text: "I appreciate the attention to detail in every garment from Shop.co. The fit is always perfect, and the materials are of high quality. It's refreshing to find a brand that consistently delivers excellence.",
    verified: true,
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const getVisibleReviews = () => {
    const visibleCount = isMobile ? 1 : 3;
    return [...Array(visibleCount)].map((_, index) => {
      const reviewIndex = (currentIndex + index) % reviews.length;
      return reviews[reviewIndex];
    });
  };

  const visibleReviews = getVisibleReviews();

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextReview();
    } else if (isRightSwipe) {
      prevReview();
    }
  };

  return (
    <div className="w-full bg-white py-16 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-cairo">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevReview}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextReview}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-all duration-300 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleReviews.length)
              }%)`,
            }}
          >
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className={`w-full md:w-1/3 px-2 transition-all duration-300 flex-shrink-0`}
              >
                <div className="bg-white p-4 rounded-lg shadow-md h-[220px] flex flex-col border border-gray-200 overflow-hidden mx-auto max-w-[360px] md:max-w-[400px]">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm font-semibold mr-2 text-gray-900">
                      {review.name}
                    </h3>
                    {review.verified && (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 flex-grow overflow-hidden">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
