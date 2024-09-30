import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Casual from "/images/casual.png";
import Formal from "/images/formal.png";
import Party from "/images/party.png";
import Gym from "/images/gym.png";

const styleCategories = [
  {
    name: "Casual",
    imageUrl: Casual,
    size: "normal",
  },
  {
    name: "Formal",
    imageUrl: Formal,
    size: "large",
  },
  {
    name: "Party",
    imageUrl: Party,
    size: "large",
  },
  {
    name: "Gym",
    imageUrl: Gym,
    size: "normal",
  },
];

const BrowseByStyle = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (category) => {
    console.log(`Clicked on ${category.name}`);
  };

  return (
    <div className="w-full flex justify-center bg-white p-4 md:p-8 font-inter">
      <div className="w-full md:w-4/5 bg-[#F0F0F0] rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 md:mb-8 text-center font-cairo">
            BROWSE BY dress STYLE
          </h2>
          <div
            className={`grid gap-6 md:gap-8 ${
              isMobile ? "grid-cols-1" : "grid-cols-3"
            }`}
          >
            {isMobile ? (
              styleCategories.map((category) => (
                <StyleCard
                  key={category.name}
                  category={category}
                  onClick={() => handleCardClick(category)}
                />
              ))
            ) : (
              <>
                <StyleCard
                  category={styleCategories[0]}
                  onClick={() => handleCardClick(styleCategories[0])}
                />
                <div className="col-span-2">
                  <StyleCard
                    category={styleCategories[1]}
                    onClick={() => handleCardClick(styleCategories[1])}
                  />
                </div>
                <div className="col-span-2">
                  <StyleCard
                    category={styleCategories[2]}
                    onClick={() => handleCardClick(styleCategories[2])}
                  />
                </div>
                <StyleCard
                  category={styleCategories[3]}
                  onClick={() => handleCardClick(styleCategories[3])}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function StyleCard({ category, onClick }) {
  return (
    <div
      className="overflow-hidden h-full rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="p-0 h-full">
        <div className="relative aspect-[3/2] h-full">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute top-0 left-0 p-4">
            <h3 className="text-black text-2xl font-bold">{category.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

StyleCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["normal", "large"]).isRequired,
  }).isRequired,
};

export default BrowseByStyle;
