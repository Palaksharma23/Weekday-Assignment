import React from "react";
import "./../styles/Button.css";

function Button({ children, backgroundColor, color, type }) {
  const buttonStyle = {
    // Setting default backgroundColor if prop is not provided
    backgroundColor: backgroundColor || "rgb(85, 239, 196)",
    // Setting default color if prop is not provided
    color: color || "white",
  };

  return (
    <button
      className={`primary-btn ${type === "easy-apply" ? " easy-apply" : ""}`}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

export default Button;
