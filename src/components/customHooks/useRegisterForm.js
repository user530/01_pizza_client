import React from "react";

const useRegisterForm = (validator, fetchCb) => {
  const [formValues, setFormValues] = React.useState({
    login: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState({});
  const [isFailed, setIsFailed] = React.useState(false);
  const [success, setSuccess] = React.useState(null);

  const permissionRef = React.useRef(null);

  const handleInput = (e) => {
    e.preventDefault();

    let { name, value } = e.target;

    name = name.split("-")[1];

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrs = validator(formValues, permissionRef.current.checked);

    setErrors(validationErrs);

    // Reset success flag
    setSuccess(null);
  };

  // Clear form
  const clearForm = () => {
    // Create object with empty values
    const clearForm = Object.keys(formValues).reduce((object, key) => {
      object[key] = "";
      return object;
    }, {});

    // Reset form values
    setFormValues(clearForm);

    // Reset permission flag
    permissionRef.current.checked = false;
  };

  React.useEffect(() => {
    const controller = new AbortController();

    // Ensure that all form fields are set to prevent firing on initial load
    const allFilled = Object.values(formValues).reduce((flag, value) => {
      // If value is empty -> set flag to false
      if (value.toString().trim().length === 0) flag = false;
      // Pass flag next
      return flag;
    }, true);

    // Fire form handler
    if (allFilled && Object.keys(errors).length === 0) formHandler();

    async function formHandler() {
      try {
        // Register user
        const data = await fetchCb(formValues, controller.signal);

        // Reset failed flag
        setIsFailed(false);

        // Set success flag
        setSuccess(data.message);

        // Clear form
        clearForm();
      } catch (error) {
        setIsFailed(error.message);
      }
    }

    return () => {
      controller.abort();
    };
  }, [errors]);

  return {
    handleInput,
    handleSubmit,
    isFailed,
    errors,
    permissionRef,
    success,
    setSuccess,
    formValues,
  };
};

export default useRegisterForm;
