import React from "react";

import benImg1 from "../assets/img/benefits/benefit1.png";
import benImg2 from "../assets/img/benefits/benefit2.png";
import benImg3 from "../assets/img/benefits/benefit3.png";
import benImg4 from "../assets/img/benefits/benefit4.png";

const benefits = [
  {
    text: "Свежайшие и качественные продукты",
    img: benImg1,
  },
  {
    text: "Быстрая доставка и лучший сервис",
    img: benImg2,
  },
  {
    text: "Лучшие повара с многолетним опытом",
    img: benImg3,
  },
  {
    text: "Незабываемый вкус настоящей пиццы",
    img: benImg4,
  },
];

const MainBenefits = () => {
  return (
    <section className="main-benefits">
      <div className="container">
        <h2 className="title-2">Мы гарантируем, что у нас:</h2>
        <div className="main-benefits__content">
          <div className="row">
            {benefits.map((benObj, ind) => (
              <div key={ind} className="col-sm-6 col-lg-3">
                <div className="main-benefits-item">
                  <div className="main-benefits-icon">
                    <img
                      src={benObj.img}
                      alt={`benefit-${ind + 1}`}
                      width="65"
                    />
                  </div>
                  <p>{benObj.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBenefits;
