import React from "react";
import { useNavigate } from "react-router-dom";

// Get access to the context
import { useAppContext } from "../../utils/context";

const useLoginForm = (validator, callback) => {
  const [formValues, setFormValues] = React.useState({
    login: "",
    password: "",
    anonymousCart: sessionStorage.getItem("cart"),
  });
  const [unauthorized, setUnauthorized] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const { setUser, setCart } = useAppContext();

  const navigate = useNavigate();

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
          const { user } = res.data;
          setUser(user);
          // Load cart
          setCart(user.cart.products);
          // Clear anonymous session
          sessionStorage.removeItem("cart");
          // Change authorization flag
          setUnauthorized(false);
          // Redirect back to the previous page
          navigate(-1);
        })
        .catch((err) => {
          console.error(err.message);
          setUnauthorized(true);
        });
    }

    return () => abortController.abort();
  }, [errors]);

  return { formValues, handleInput, handleSubmit, errors, unauthorized };
};

export default useLoginForm;
