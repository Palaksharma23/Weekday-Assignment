import React from "react";
import "./../styles/Button.css";

function Button({ children, backgroundColor, color, type }) {
  const buttonStyle = {
    backgroundColor: backgroundColor || "rgb(85, 239, 196)",
    color: color || "white", // Set default color if prop is not provided
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
