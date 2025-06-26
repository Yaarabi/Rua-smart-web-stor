


import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    className = "",
    ...props
}) => {
    const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200";
    const variants = {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        outline: "border border-gray-800 text-gray-800 hover:bg-gray-100",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
