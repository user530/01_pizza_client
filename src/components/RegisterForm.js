import React from "react";
import { GrClose } from "react-icons/gr";

import useRegisterForm from "./customHooks/useRegisterForm";

import { registrationValidation } from "../utils/validators";
import { register } from "../utils/dataTransfer";

const RegisterForm = () => {
  const {
    formValues,
    handleInput,
    handleSubmit,
    isFailed,
    errors,
    permissionRef,
    success,
    setSuccess,
  } = useRegisterForm(registrationValidation, register);

  return (
    <div
      className={`forms-wrapper__col forms_col--reg ${
        isFailed ? "form-failed" : null
      }`}
    >
      <h3>Регистрация</h3>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group form-field form-field">
          <input
            type="text"
            name="register-login"
            className={`form-field-text ${errors.login ? "incorrect" : ""}`}
            placeholder="Логин"
            value={formValues.login}
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
            className={`form-field-text ${errors.password ? "incorrect" : ""}`}
            placeholder="Пароль"
            value={formValues.password}
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
            className={`form-field-text ${errors.name ? "incorrect" : ""}`}
            placeholder="Имя"
            value={formValues.name}
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
            className={`form-field-text ${errors.email ? "incorrect" : ""}`}
            placeholder="Адрес почты"
            value={formValues.email}
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
            className={`form-field-text ${errors.phone ? "incorrect" : ""}`}
            placeholder="Номер телефона"
            value={formValues.phone}
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
            className={`form-checkbox ${errors.permission ? "incorrect" : ""}`}
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

      {isFailed ? <span className="fail-msg">{isFailed}</span> : null}

      {success ? (
        <div className="modal-overlay">
          <div className="message-box">
            <p>{success}</p>

            <button
              className="custom-modal-close"
              onClick={() => {
                setSuccess(null);
              }}
            >
              <GrClose />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterForm;
