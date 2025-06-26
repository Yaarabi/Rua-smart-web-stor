
// components/ui/card.tsx

import React from "react";

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-md ${className}`}>
            {children}
        </div>
    );
};

interface CardContentProps {
    className?: string;
    children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className = "",
}) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
};
