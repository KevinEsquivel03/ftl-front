import styles from './SeparatorWithText.module.css';
import React from "react";

interface SeparatorWithTextProps {
    children:
        React.ReactNode;
    className?: string;
}

export const SeparatorWithText = ({children, className}: SeparatorWithTextProps) => {
    return (
        <div className={`${styles.separator} ${className}`}>
            <span>{children}</span>
        </div>
    );
};