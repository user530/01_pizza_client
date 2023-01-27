import React from "react";

import ctaLogo from "../assets/img/cta.png";

const MainCTA = () => {
  return (
    <section
      className="main-cta lazy"
      style={{ backgroundImage: `url(${ctaLogo})` }}
    >
      <div className="title-group text-center">
        <h2 className="title-2">Для лучшего вкуса и аромата блюд</h2>
        <p>
          Мы используем специальные специи с Кавказа, создающие неповторимый
          вкус
        </p>
      </div>
    </section>
  );
};

export default MainCTA;
