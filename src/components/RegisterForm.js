import React from "react";

const RegisterForm = () => {
  return (
    <>
      <h3>Регистрация</h3>
      <form className="registration-form">
        <input type="text" name="registerLogin" />
        <input type="text" name="registerPassword" />
        <input type="text" name="registerName" />
        <input type="text" name="registerEmail" />
        <input type="text" name="registerPhone" />
        <input type="radio" name="registerPermission" />

        <input type="submit" value={"Регистрация"} />
      </form>
    </>
  );
};

export default RegisterForm;
