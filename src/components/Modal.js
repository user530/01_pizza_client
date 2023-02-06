import React from "react";

import { GrClose } from "react-icons/gr";

const contactURL = "http://localhost:5000/api/v1/contact";

const Modal = (props) => {
  const { isModalOpen, closeModalHandle } = props;

  const [formData, setFormData] = React.useState({});

  const modalRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const infoRef = React.useRef(null);
  const permissionRef = React.useRef(null);

  const contactFormSubmit = (e) => {
    e.preventDefault();

    const nameCheck = validateInput(nameRef, /^[ЁёА-я]{2,20}$/);
    const phoneCheck = validateInput(phoneRef, /^\d{11}$/);
    const permCheck = validateCheckbox(permissionRef);

    handleInput(nameRef, !nameCheck);
    handleInput(phoneRef, !phoneCheck);
    handleInput(permissionRef, !permCheck);

    if (nameCheck && phoneCheck && permCheck) {
      const formFields = {
        name: nameRef.current.value,
        phone: phoneRef.current.value.toString(),
        info: infoRef.current.value,
      };

      setFormData(formFields);
    }
  };

  const overlayClick = (e) => {
    if (!e.nativeEvent.composedPath().includes(modalRef.current))
      closeModalHandle();
  };

  const validateInput = (inputRef, regex) => {
    if (!inputRef.current.value.match(regex)) return false;

    return true;
  };

  const validateCheckbox = (checkboxRef) => {
    return checkboxRef.current.checked;
  };

  const handleInput = (ref, flag) => {
    ref.current.classList.toggle("incorrect", flag);
  };

  const sendContact = async (URL, signal) => {
    try {
      const response = await fetch(URL, {
        signal: signal,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    sendContact(contactURL, signal);

    return () => {
      controller.abort();
    };
  }, [contactURL, formData]);

  React.useEffect(() => {
    const body = document.querySelector("body");
    body.classList.toggle("noscroll", isModalOpen);
  }, [isModalOpen]);

  return (
    <div
      className={`custom-modal-overlay ${isModalOpen ? "visible" : ""}`}
      onClick={overlayClick}
    >
      <div className="custom-modal-content" ref={modalRef}>
        <button className="custom-modal-close" onClick={closeModalHandle}>
          <GrClose />
        </button>

        <div className="custom-modal-header">
          <h3 className="custom-modal-title">
            Оставьте заявку, и мы перезвоним вам в течение 5&nbsp;минут
          </h3>
        </div>

        <div className="custom-modal-body">
          <form onSubmit={contactFormSubmit}>
            <div className="form-field">
              <input
                ref={nameRef}
                type="text"
                name="contact-name"
                className="form-field-text"
                placeholder="Ваше имя (*)"
                onBlur={(e) => {
                  const incorrect = !e.target.value.match(/^[ЁёА-я]{2,20}$/);
                  e.target.classList.toggle("incorrect", incorrect);
                  return;
                }}
              />
              <span className="input-error">
                Имя должно содержать от 2 до 20 символов и использовать только
                буквы русского алфавита!
              </span>
            </div>

            <div className="form-field">
              <input
                ref={phoneRef}
                type="text"
                name="contact-phone"
                className="form-field-text"
                placeholder="Ваш телефон (*)"
                onBlur={(e) => {
                  const incorrect = !e.target.value.match(/^\d{11}$/);
                  e.target.classList.toggle("incorrect", incorrect);
                  return;
                }}
              />
              <span className="input-error">
                Номер телефона должен содержать 11 цифр и не использовать спец
                символов!
              </span>
            </div>

            <div className="form-field">
              <textarea
                ref={infoRef}
                name="contact-info"
                placeholder="Комментарии к заказу"
              ></textarea>
            </div>

            <div className="form-field">
              <label className="permission-field">
                <input
                  ref={permissionRef}
                  type="checkbox"
                  name="contact-permission"
                />
                <span>* Я даю согласие на обработку моих данных</span>
                <span className="input-error">
                  Пожалуйста, подтвердите согласие на обработку ваших данных!
                </span>
              </label>
            </div>

            <button type="submit">Оставить заявку</button>
          </form>
        </div>
      </div>

      <div className="contact-msg success">
        <p>
          Ваша заявка успешно получена, мы свяжемся с вами в ближайшее время!
        </p>
      </div>
      <div className="contact-msg error">
        <p>
          К сожалению в процессе отправки произошла непредвиденная ошибка.
          Пожалуйста, повторите попытку позднее!
        </p>
      </div>
    </div>
  );
};

export default Modal;
