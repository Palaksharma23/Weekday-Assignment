import React from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import "./../styles/Modal.css"

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-style">
        <button onClick={onClose}>
          <HiXMark />
        </button>

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
