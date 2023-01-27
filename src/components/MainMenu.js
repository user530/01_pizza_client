import React from "react";

import MainProductsList from "./MainProductsList";

const MainMenu = () => {
  return (
    <section className="main-menu" id="main-menu">
      <div className="container">
        <div className="title-group text-center">
          <h2 className="title-2">Меню:</h2>
          <p>
            Не будь жадиной - приводи своих друзей! <br /> Пусть они тоже
            попробуют нашу божественную пиццу!
          </p>
        </div>

        <MainProductsList />
      </div>
    </section>
  );
};

export default MainMenu;
