import React from "react";

import ContactForm from "./ContactForm";
import ContactSuccess from "./ContactSuccess";

import { FiMail } from "react-icons/fi";

import useContactModal from "./customHooks/useContactModal";
import { contactValidation } from "../utils/validators";
import { sendContactForm } from "../utils/dataTransfer";

const ContactUs = () => {
  const context = useContactModal(contactValidation, sendContactForm);
  const { modalOpen, setModalOpen, isSubmitted, modalRef } = context;

  const handleOverlayClick = (e) => {
    if (!e.nativeEvent.composedPath().includes(modalRef.current))
      setModalOpen(false);
  };

  return (
    <>
      <button className="page-btn2" onClick={() => setModalOpen(true)}>
        <span>Написать нам</span>
        <FiMail className="far fa-envelope" />
      </button>

      <div
        className={`custom-modal-overlay ${modalOpen ? "visible" : ""}`}
        onClick={handleOverlayClick}
      >
        {isSubmitted ? (
          <ContactSuccess setModalOpen={setModalOpen} modalRef={modalRef} />
        ) : (
          <ContactForm {...context} />
        )}
      </div>
    </>
  );
};

export default ContactUs;
