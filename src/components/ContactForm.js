import React from "react";

import { GrClose } from "react-icons/gr";

const ContactForm = (props) => {
  const {
    setModalOpen,
    handleSubmit,
    handleInput,
    permissionRef,
    modalRef,
    errors,
  } = props;

  return (
    <div className="custom-modal-content" ref={modalRef}>
      <button
        className="custom-modal-close"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <GrClose />
      </button>

      <div className="custom-modal-header">
        <h3 className="custom-modal-title">
          Оставьте заявку, и мы перезвоним вам в течение 5&nbsp;минут
        </h3>
      </div>

      <div className="custom-modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="contact-name"
              className={`form-field-text ${errors.name ? "incorrect" : ""}`}
              placeholder="Ваше имя (*)"
              onInput={handleInput}
            />

            {errors.name && <span className="input-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <input
              type="text"
              name="contact-phone"
              className={`form-field-text ${errors.phone ? "incorrect" : ""}`}
              placeholder="Ваш телефон (*)"
              onChange={handleInput}
            />

            {errors.phone && (
              <span className="input-error">{errors.phone}</span>
            )}
          </div>

          <div className="form-field">
            <textarea
              name="contact-info"
              placeholder="Комментарии к заказу"
              onChange={handleInput}
            ></textarea>
          </div>

          <div className="form-field">
            <label className="permission-field">
              <input
                type="checkbox"
                name="contact-permission"
                className={errors.permission ? "incorrect" : ""}
                ref={permissionRef}
              />
              <span>* Я даю согласие на обработку моих данных</span>

              {errors.permission && (
                <span className="input-error">{errors.permission}</span>
              )}
            </label>
          </div>

          <button type="submit">Оставить заявку</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
