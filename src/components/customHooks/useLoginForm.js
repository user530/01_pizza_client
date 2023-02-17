import React from "react";

// Get access to the context
import { useAppContext } from "../../utils/context";

const useLoginForm = (validator, callback) => {
  const [formValues, setFormValues] = React.useState({
    login: "",
    password: "",
  });
  const [unauthorized, setUnauthorized] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const { setUser } = useAppContext();

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
          setUser(res.data.user);
          // LOAD CART
          setUnauthorized(false);
          // REDIRECT
        })
        .catch((err) => {
          console.error(err.message);
          setUnauthorized(true);
        });
    }

    return abortController.abort();
  }, [errors]);

  return { formValues, handleInput, handleSubmit, errors, unauthorized };
};

export default useLoginForm;
