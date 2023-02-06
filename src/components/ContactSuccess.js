import React from "react";
import { GrClose } from "react-icons/gr";

const ContactSuccess = (props) => {
  const { setModalOpen, modalRef } = props;

  return (
    <div className="custom-modal-content contact-success" ref={modalRef}>
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
          Спасибо! Ваша заявка успешно принята. Наш оператор свяжется с вами в
          ближайшее время.
        </h3>
      </div>
    </div>
  );
};

export default ContactSuccess;
