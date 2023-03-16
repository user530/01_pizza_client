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

export const registrationValidation = (formValues, permissionFlag) => {
  try {
    // Clear form values
    Object.keys(formValues).forEach(
      (key) => (formValues[key] = formValues[key].toString().trim())
    );

    // Destructure them
    const { login, password, name, email, phone } = formValues;

    // Prepare err object
    let errors = {};

    // Check login
    if (!login) errors.login = "Пожалуйста, введите логин!";
    else if (!/^\S{3,16}$/.test(login))
      errors.login =
        "Логин должен содержать от 3 до 16 символов и не включать пробелы.";

    // Check password
    if (!password) errors.password = "Пожалуйста, введите пароль!";
    else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[A-z\d!@#$%^&]{6,}$/.test(
        password
      )
    )
      errors.password =
        "Пароль должен быть не меньше 6 символов и содержать как минимум одну заглавную и одну прописную букву, одну цифру и один спец символ. Допустимы символы латинского алфавита, цифры и специальные символы(!,@,#,$,%,^,&).";

    // Check name
    if (!name) errors.name = "Пожалуйста, введите имя!";
    else if (!/^[ЁёА-я]{2,20}$/.test(name))
      errors.name = "Имя должно содержать от 2 до 20 букв русского алфавита.";

    // Check email
    if (!email) errors.email = "Пожалуйста, введите адрес почты!";
    else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    )
      errors.email = "Указан некорректный формат почтового адреса.";

    // Check phone
    if (!phone) errors.phone = "Пожалуйста, введите номер телефона";
    else if (!/^\d{11}$/.test(phone))
      errors.phone =
        "Номер телефона должен содержать 11 цифр без специальных символов.";

    // Check permission flag
    if (!permissionFlag)
      errors.permission =
        "Пожалуйста, дайте согласие на обработку личных данных!";

    return errors;
  } catch (error) {
    throw new Error("Некорректные данные регистрации!");
  }
};
