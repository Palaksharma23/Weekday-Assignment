import React from "react";
import "./../styles/Button.css";

function Button({ children }) {
  return <button className="primary-btn">{children}</button>;
}

export default Button;
