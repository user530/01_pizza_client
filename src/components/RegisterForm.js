import React from "react";

import useRegisterForm from "./customHooks/useRegisterForm";

import { registrationValidation } from "../utils/validators";
import { register } from "../utils/dataTransfer";

const RegisterForm = () => {
  const {
    handleInput,
    handleSubmit,
    isFailed,
    errors,
    permissionRef,
    success,
  } = useRegisterForm(registrationValidation, register);

  return (
    <>
      <h3>Регистрация</h3>

      {success ? <span>{success}</span> : null}

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group form-field form-field">
          <input
            type="text"
            name="register-login"
            className={`form-field-text ${
              errors.login || isFailed ? "incorrect" : ""
            }`}
            placeholder="Логин"
            onChange={handleInput}
          />

          {errors.login ? (
            <span className="input-error">{errors.login}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            type="text"
            name="register-password"
            className={`form-field-text ${
              errors.password || isFailed ? "incorrect" : ""
            }`}
            placeholder="Пароль"
            onChange={handleInput}
          />

          {errors.password ? (
            <span className="input-error">{errors.password}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            type="text"
            name="register-name"
            className={`form-field-text ${
              errors.name || isFailed ? "incorrect" : ""
            }`}
            placeholder="Имя"
            onChange={handleInput}
          />

          {errors.name ? (
            <span className="input-error">{errors.name}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            type="text"
            name="register-email"
            className={`form-field-text ${
              errors.email || isFailed ? "incorrect" : ""
            }`}
            placeholder="Адрес почты"
            onChange={handleInput}
          />

          {errors.email ? (
            <span className="input-error">{errors.email}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            type="text"
            name="register-phone"
            className={`form-field-text ${
              errors.phone || isFailed ? "incorrect" : ""
            }`}
            placeholder="Номер телефона"
            onChange={handleInput}
          />

          {errors.phone ? (
            <span className="input-error">{errors.phone}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            ref={permissionRef}
            type="radio"
            name="register-permission"
            className={`form-checkbox ${
              errors.permission || isFailed ? "incorrect" : ""
            }`}
          />
          <span
            className="custom-checkbox"
            onClick={(e) => {
              const hidenEl = permissionRef.current;
              hidenEl.checked = !hidenEl.checked;
            }}
          ></span>
          <span
            onClick={(e) => {
              const hidenEl = permissionRef.current;
              hidenEl.checked = !hidenEl.checked;
            }}
          >
            Соглашаюсь на обработку моих данных.
          </span>

          {errors.permission ? (
            <span className="input-error">{errors.permission}</span>
          ) : null}
        </div>

        <div className="form-group form-field form-group form-field--btn">
          <input
            className="page-button page-button--red"
            type="submit"
            value="Регистрация"
          />
        </div>
      </form>

      {isFailed ? <span>{isFailed}</span> : null}
    </>
  );
};

export default RegisterForm;
