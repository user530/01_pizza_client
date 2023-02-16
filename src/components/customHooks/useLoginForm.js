import React from "react";

const useLoginForm = (validator, callback) => {
  const [formValues, setFormValues] = React.useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleInput = (e) => {
    e.preventDefault();

    let { name, value } = e.target;

    name = name.split("-")[1];

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validator(formValues);

    setErrors(validationErrors);
  };

  React.useEffect(() => {
    const abortController = new AbortController();

    const { login, password } = formValues;

    if (login && password && Object.keys(errors).length === 0) {
      callback(formValues, abortController.signal)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
          alert(err.message);
        });
    }

    return abortController.abort();
  }, [errors]);

  return { formValues, handleInput, handleSubmit, errors };
};

export default useLoginForm;
