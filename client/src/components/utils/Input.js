import React, { forwardRef } from "react";

const Input = forwardRef(
<<<<<<< HEAD
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
=======
    (
        {
            placeholder = "",
            type = "text",
            name,
            className = "",
            disabled = false,
            children,
        },
        ref
    ) => {
        const IconStyles = "flex gap-3 px-3 items-center";
        return (
            <div
                className={`bg-white rounded-sm font-inter ${
                    children ? IconStyles : ""
                }`}
            >
                {children}
                <input
                    placeholder={placeholder}
                    type={type}
                    className={`w-full disabled:cursor-not-allowed ${className}`}
                    name={name}
                    ref={ref}
                    disabled={disabled}
                />
            </div>
        );
    }
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
);

export default Input;
