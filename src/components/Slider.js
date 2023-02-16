import React from "react";

import "../assets/css/slider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = ({ children }) => {
  const [activeInd, setActiveInd] = React.useState(0);

  // Only img children elements will be rendered
  const imgChildren = children.filter((childElem) => childElem.type === "img");

  // Calculate next and prev slide indicex
  const nextInd = activeInd === imgChildren.length - 1 ? 0 : activeInd + 1;
  const prevInd = activeInd === 0 ? imgChildren.length - 1 : activeInd - 1;

  // Automatically change slides
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveInd(nextInd);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeInd]);

  // Slider HTML
  return (
    <div className="slider-wrapper">
      <div className="slider-content">
        {imgChildren.map((childElem, ind) => {
          return (
            <div
              key={ind}
              className={`slider-item ${
                ind === activeInd ? "slider-item-active" : ""
              }`}
            >
              {childElem}
            </div>
          );
        })}
      </div>

      <div className="slider-nav-prev" onClick={() => setActiveInd(prevInd)}>
        <FaChevronLeft />
      </div>

      <div className="slider-nav-next" onClick={() => setActiveInd(nextInd)}>
        <FaChevronRight />
      </div>

      <div className="slider-dots">
        {imgChildren.map((childElem, ind) => {
          return (
            <button
              key={ind}
              className={`slider-dot ${
                ind === activeInd ? "slider-dot-active" : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
