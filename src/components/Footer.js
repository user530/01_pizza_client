import React from "react";
import { Link } from "react-router-dom";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { FiMail } from "react-icons/fi";
import logo from "../assets/img/logo-footer.png";

const Footer = ({ workingHours, socialIcons, phone, address, copyright }) => {
  const contactBtn = () => {
    console.log("CONTACT BTN ACTION");
  };

  return (
    <footer id="footer" className="footer">
      <YMaps>
        <div className="map">
          <Map
            state={{ center: address.coordinates, zoom: 18 }}
            width="100%"
            height="100%"
          />
        </div>
      </YMaps>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-4">
            <div className="footer-content">
              <Link className="footer-logo" to="/">
                <img src={logo} alt="logo" />
              </Link>

              <div className="footer-address">
                <p>{address.real}</p>
                <Link to={`mailto:${address.email}`}>{address.email}</Link>
              </div>

              <div className="footer-working-houres text-2">
                <div className="working-hours__title">{workingHours.title}</div>
                <div className="working-hours__info">{workingHours.info}</div>
              </div>

              <div className="footer-contacts d-flex">
                <a
                  href={`tel:${Array.from(phone)
                    .filter((char) => new RegExp(/\d+/).test(char))
                    .join("")}`}
                >
                  {phone}
                </a>

                <div className="social-icons">
                  {socialIcons.map((iconObj, index) => (
                    <a key={index} href={iconObj.link} target={"_blank"}>
                      {iconObj.icon}
                    </a>
                  ))}
                </div>
              </div>

              <button className="page-btn2" onClick={contactBtn}>
                <span>Написать нам</span>
                <FiMail className="far fa-envelope" />
              </button>

              <div className="copyright-text">
                <span>{copyright.first}</span>
                <span>{copyright.second}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
