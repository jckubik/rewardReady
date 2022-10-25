import React, { forwardRef } from "react";

const Input = forwardRef(
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
);

export default Input;
