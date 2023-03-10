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
    <>
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
          />

          {errors.password || unauthorized ? (
            <span className="input-error">{errors.password}</span>
          ) : null}
        </div>

        <input type="submit" value={"Вход"} />
      </form>

      {unauthorized ? (
        <div>
          <span>Авторизация провалилась, проверьте ваши данные.</span>
        </div>
      ) : null}
    </>
  );
};

export default LoginForm;
