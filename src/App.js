import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/app.css";

import {
  Main,
  Menu,
  Product,
  Delivery,
  News,
  Special,
  About,
  Contact,
  PageNotFound,
} from "./pages";

import { Header, Footer } from "./components";

import instagram from "./assets/img/instagram.png";
import viber from "./assets/img/viber.png";
import whatsapp from "./assets/img/whatsapp.png";
import telegram from "./assets/img/telegram.png";

// Variables
const workingHours = {
  title: "Прием заказов",
  info:
    "СР,ЧТ, ВС  с 15:00 - 00:00;   ПТ, СБ с 15:00 - 02:00;   ПН, ВТ - выходные дни",
};

const socialIcons = [
  {
    icon: <img src={viber} alt="viber" width={24} height={24} />,
    link: "viber://chat?number=#/",
  },
  {
    icon: <img src={telegram} alt="telegram" width={24} height={24} />,
    link: "https://telegram.im/#",
  },
  {
    icon: <img src={whatsapp} alt="whatsapp" width={24} height={24} />,
    link: "https://api.whatsapp.com/send?phone=#",
  },
  {
    icon: <img src={instagram} alt="instagram" width={24} height={24} />,
    link: "@mikipizzanv",
  },
];

const phone = "8 (920) 445-44-43";

const address = {
  real: "г.Сочи, ул.Морская, 25",
  email: "info@gmail.com",
  coordinates: [44.194408, 38.885652],
};

const menu = [
  { title: "Главная", link: "/" },
  { title: "Меню", link: "/menu" },
  { title: "Доставка и оплата", link: "/dostavka" },
  { title: "Новости и акции", link: "/news" },
  { title: "О нас", link: "/about" },
  { title: "Контакты", link: "/contact" },
];

const copyright = {
  first: " © 2018-2020. ",
  second: "Пицца и роллы | Доставка пиццы и роллов",
};

function App() {
  return (
    <Router>
      <Header
        workingHours={workingHours}
        socialIcons={socialIcons}
        phone={phone}
        menu={menu}
      />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<Product />} />
        <Route path="/dostavka" element={<Delivery />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:special" element={<Special />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer
        workingHours={workingHours}
        socialIcons={socialIcons}
        phone={phone}
        address={address}
        copyright={copyright}
      />
    </Router>
  );
}

export default App;
