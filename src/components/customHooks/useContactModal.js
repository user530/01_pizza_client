import React from "react";

const useContactModal = (validator, callback) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    name: "",
    phone: "",
    info: "",
  });
  const [errors, setErrors] = React.useState({});

  const modalRef = React.useRef(null);
  const permissionRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validator(formValues, permissionRef.current.checked);

    setErrors(err);
  };

  const handleInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    name = name.split("-")[1];

    setFormValues({ ...formValues, [name]: value });
  };

  React.useEffect(() => {
    const controller = new AbortController();

    const { name, phone } = formValues;

    if (name && phone && Object.keys(errors).length === 0)
      callback(formValues, controller.signal)
        .then((res) => {
          if (res.success) setIsSubmitted(true);
          else
            alert(
              "В процессе отправки произошла ошибка, пожалуйста, повторите ваш запрос позднее."
            );
        })
        .catch((err) => {
          console.log(err);
          alert(
            "В процессе отправки произошла ошибка, пожалуйста, повторите ваш запрос позднее."
          );
        });

    return () => controller.abort();
  }, [errors]);

  return {
    modalOpen,
    setModalOpen,
    isSubmitted,
    setIsSubmitted,
    handleSubmit,
    handleInput,
    formValues,
    errors,
    modalRef,
    permissionRef,
  };
};

export default useContactModal;
