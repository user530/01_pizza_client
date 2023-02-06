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
      name:
        "Имя должно содержать от 2 до 20 символов и использовать только буквы русского алфавита!",
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
