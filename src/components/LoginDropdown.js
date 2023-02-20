import React from "react";
import { Link } from "react-router-dom";

import useLoginDropdown from "./customHooks/useLoginDropdown";

const LoginDropdown = () => {
  const { photo, logout, visible, setVisible } = useLoginDropdown();

  return (
    <>
      <div
        className="login-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div className="login-icon">
          <img src={photo} alt="user_photo" width="35px" height="35px" />
        </div>

        {visible ? (
          <div className="login-dropdown">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <Link to={"/user"}>Профиль</Link>
              </div>
              <div className="dropdown-item">
                <p onClick={logout}>Выйти</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default LoginDropdown;
