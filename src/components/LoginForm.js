import React from "react";
import { useLoginForm } from "../components/customHooks";
import { loginValidation } from "../utils/validators";
import { login } from "../utils/dataTransfer";

const LoginForm = () => {
  const { handleInput, handleSubmit, errors } = useLoginForm(
    loginValidation,
    login
  );

  return (
    <>
      <h3>Авторизация:</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="user-login" onChange={handleInput} />

          {errors.login ? (
            <span className="input-error">{errors.login}</span>
          ) : null}
        </div>

        <div className="form-group">
          <input type="text" name="user-password" onChange={handleInput} />

          {errors.password ? (
            <span className="input-error">{errors.password}</span>
          ) : null}
        </div>

        <input type="submit" value={"Вход"} />
      </form>
    </>
  );
};

export default LoginForm;
