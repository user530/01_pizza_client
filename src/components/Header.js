import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
// import logoMenu from "../assets/img/logo-menu.png";

import { SlLogin, SlBasket, SlBasketLoaded } from "react-icons/sl";

// Get access to the context
import { useAppContext } from "../utils/context";

const Header = ({ workingHours, socialIcons, phone, menu }) => {
  const { cart } = useAppContext();

  const openMenu = () => {
    console.log("OPEN MENU CLICKED!");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-column">
            <Link className="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="header-nav">
              <div className="header-nav__row">
                <div className="working-hours text-2 d-none d-xl-flex">
                  <div className="working-hours__title">
                    {workingHours.title}
                  </div>
                  <div className="working-hours__info">{workingHours.info}</div>
                </div>
                <div className="social-icons">
                  {socialIcons.map((iconObj, index) => (
                    <a key={index} href={iconObj.link} target={"_blank"}>
                      {iconObj.icon}
                    </a>
                  ))}
                </div>
              </div>
              <ul className="header-menu">
                {menu.map((menuItem, index) => (
                  <li key={index} className={index === 0 ? "first active" : ""}>
                    <Link to={menuItem.link}>{menuItem.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="fix-wrapper">
            <div className="header-column header-column--left">
              <div className="contact-phone">
                <a
                  href={`tel:${Array.from(phone)
                    .filter((char) => new RegExp(/\d+/).test(char))
                    .join("")}`}
                >
                  {phone}
                </a>
              </div>
              <div className="user-controls">
                <div className="user-log-in">
                  <Link to={"/user"}>
                    <SlLogin />
                  </Link>
                </div>
                <div className="user-basket">
                  <Link to={"/cart"}>
                    {cart && cart.length > 0 ? (
                      <SlBasketLoaded />
                    ) : (
                      <SlBasket />
                    )}
                    {cart.length > 0 && (
                      <span className="basket-value">{cart.length}</span>
                    )}
                  </Link>
                </div>
              </div>
              <div className="menu-toggle" onClick={openMenu}>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
