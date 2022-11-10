import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      placeholder = "",
      type = "text",
      name,
      className = "",
      disabled = false,
      icon,
      label,
    },
    ref
  ) => {
    const labelLayout = "flex gap-3 items-center";
    return (
      <div className={`relative ${label ? labelLayout : ""}`}>
        <span className="body font-medium w-1/2">{label}</span>
        <input
          placeholder={placeholder}
          type={type}
          className={`w-full h-9 rounded-md px-2 body ${
            icon ? "pl-10" : ""
          } ${className}`}
          name={name}
          ref={ref}
          disabled={disabled}
        />
        <div className="left-3 bottom-2 absolute">{icon}</div>
      </div>
    );
  }
);

export default Input;
