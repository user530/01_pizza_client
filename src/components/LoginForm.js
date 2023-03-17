import React from "react";
import { useLoginForm } from "../components/customHooks";
import { loginValidation } from "../utils/validators";
import { login } from "../utils/dataTransfer";

const LoginForm = () => {
  const { handleInput, handleSubmit, errors, unauthorized } = useLoginForm(
    loginValidation,
    login
  );

  return (
    <div className="forms-wrapper__col">
      <h3>Авторизация:</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group form-field">
          <input
            type="text"
            name="user-login"
            className={`form-field-text ${
              errors.login || unauthorized ? "incorrect" : ""
            }`}
            onChange={handleInput}
            placeholder="Логин"
          />

          {errors.login || unauthorized ? (
            <span className="input-error">{errors.login}</span>
          ) : null}
        </div>

        <div className="form-group form-field">
          <input
            type="text"
            name="user-password"
            className={`form-field-text ${
              errors.password || unauthorized ? "incorrect" : ""
            }`}
            onChange={handleInput}
            placeholder="Пароль"
          />

          {errors.password || unauthorized ? (
            <span className="input-error">{errors.password}</span>
          ) : null}
        </div>

        <div className="form-group form-group--btn">
          <input
            className="page-button page-button--yellow"
            type="submit"
            value="Вход"
          />
        </div>
      </form>

      {unauthorized ? (
        <div>
          <span>Авторизация провалилась, проверьте ваши данные.</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoginForm;
