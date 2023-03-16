import React from "react";
import { LoginForm, RegisterForm } from "../components";

const Authorization = () => {
  return (
    <section className="authorization-page">
      <div className="container">
        <h1 className="page-title">Вход в личный кабинет</h1>
        <div className="forms-wrapper">
          <div className="row">
            <div className="col-md-6">
              <div className="forms-wrapper__col">
                <LoginForm />
              </div>
            </div>
            <div className="col-md-6">
              <div className="forms-wrapper__col forms_col--reg">
                <RegisterForm />
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authorization;
