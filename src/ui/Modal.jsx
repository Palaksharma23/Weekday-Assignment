import React from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import "./../styles/Modal.css";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-style">
        <button className="modal-close-btn">
          <HiXMark />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
