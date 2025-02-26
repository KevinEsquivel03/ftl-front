import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: string;
  size: string;
  rounded: boolean;
  disableShadow: boolean;
  disabled: boolean;
  color: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick}
            className={`
            ${props.className}
            ${styles.button} 
            ${styles[props.variant]} 
            ${styles[props.size]} 
            ${props.rounded ? styles.rounded : ''} 
            ${props.disableShadow ? styles.disableShadow : ''} 
            ${props.disabled ? styles.disabled : ''} 
            ${styles[props.color]}
            `}
    >
      {props.label}
    </button>
  );
}
