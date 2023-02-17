export const contactValidation = (formValuesObj, permissionFlag) => {
  let { name, phone } = formValuesObj;
  name = name.trim();
  phone = phone.toString().trim();

  let validation_errors = {};

  // Validate name
  if (name === "")
    validation_errors = {
      ...validation_errors,
      name: "Пожалуйста, введите имя!",
    };
  else if (!/^[ЁёА-я]{2,20}$/.test(name))
    validation_errors = {
      ...validation_errors,
      name: "Имя должно содержать от 2 до 20 символов и использовать только буквы русского алфавита!",
    };

  // Validate phone
  if (phone === "")
    validation_errors = {
      ...validation_errors,
      phone: "Пожалуйста, введите контактный телефон!",
    };
  else if (!/^\d{11}$/.test(phone))
    validation_errors = {
      ...validation_errors,
      phone:
        "Номер телефона должен содержать 11 цифр и не использовать спецсимволов!",
    };

  // Check permission
  if (!permissionFlag)
    validation_errors = {
      ...validation_errors,
      permission: "Пожалуйста, подтвердите согласие на обработку ваших данных!",
    };

  return validation_errors;
};

export const loginValidation = (formValues) => {
  let { login, password } = formValues;

  login = login.toString().trim();
  password = password.toString().trim();

  let loginErrors = {};

  // Validate login
  if (login === "")
    loginErrors = {
      ...loginErrors,
      login: "Пожалуйста, введите логин!",
    };
  else if (!/^\S{3,16}$/.test(login))
    loginErrors = {
      ...loginErrors,
      login: "Логин должен содержать от 3 до 16 символов без пробелов!",
    };

  // Validate password
  if (password === "")
    loginErrors = {
      ...loginErrors,
      password: "Пожалуйста, введите пароль!",
    };
  else if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[A-z\d!@#$%^&]{6,}$/.test(
      password
    )
  )
    loginErrors = {
      ...loginErrors,
      password:
        "Допустимы символы латинского алфавита, цифры и специальные символы(!,@,#,$,%,^,&). Пароль должен быть не меньше 6 символов и содержать как минимум одну заглавную и одну прописную буквы, одну цифру и один спец символ.",
    };

  return loginErrors;
};
