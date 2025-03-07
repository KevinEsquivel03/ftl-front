import styles from './SocialButton.module.css';
import React from "react";

interface SocialButtonProps {
    provider: 'google' | 'facebook' | 'apple';
    children: React.ReactNode;
    className?: string;
}

export const SocialButton = ({provider, children, className}: SocialButtonProps) => {
    return (
        <button
            type="button"
            className={`${styles.socialButton} ${styles[provider]} ${className}`}
        >
            {children}
        </button>
    );
};