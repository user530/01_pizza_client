import React from "react";
import Slider from "./Slider";

import slider1 from "../assets/img/main_slider/slider1.jpg";
import slider2 from "../assets/img/main_slider/slider2.jpg";
import slider3 from "../assets/img/main_slider/slider3.jpg";
import slider4 from "../assets/img/main_slider/wok.jpg";

const MainBanner = () => {
  return (
    <section id="banner" className="banner">
      <div className="hidden-layout"></div>
      <Slider>
        <img src={slider1} alt="slide1" />
        <img src={slider2} alt="slide2" />
        <img src={slider3} alt="slide3" />
        <img src={slider4} alt="slide4" />
      </Slider>
    </section>
  );
};

export default MainBanner;
