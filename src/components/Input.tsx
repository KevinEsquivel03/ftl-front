import styles from './Input.module.css';
import React, {useState, useCallback, forwardRef} from "react";

type InputType =
    | 'text'
    | 'password'
    | 'password-confirm'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'month'
    | 'week'
    | 'color'
    | 'range'
    | 'file'
    | 'select'
    | 'textarea';

interface BaseInputProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    value: string;
    onChange: (event: React. ChangeEvent<HTMLInputElement> | React. ChangeEvent<HTMLSelectElement> | React. ChangeEvent<HTMLTextAreaElement>) => void;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    invalid?: boolean;
    ariaLabel?: string;
    'aria-describedby'?: string;
}

interface SelectInputProps extends BaseInputProps {
    type: 'select';
    options: { value: string; label: string }[];
}

interface TextAreaInputProps extends BaseInputProps {
    type: 'textarea';
    rows?: number;
    cols?: number;
}

interface PasswordInputProps extends BaseInputProps {
    type: 'password';
    showStrength?: boolean;
}

interface OtherInputProps extends BaseInputProps {
    type?: Exclude<InputType, 'select' | 'textarea' | 'password'>;
    min?: string;
    max?: string;
    step?: string;
    pattern?: string;
    accept?: string;
    multiple?: boolean;
}

type InputProps =
    | SelectInputProps
    | TextAreaInputProps
    | PasswordInputProps
    | OtherInputProps;

export const Input = forwardRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    InputProps
>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const PasswordVisibilityIcon = useCallback(() => (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.iconButton}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            disabled={props.disabled}
            tabIndex={-1}
        >
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {showPassword ? (
                    <>
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"/>
                    </>
                ) : (
                    <>
                        <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"/>
                        <path d="M3 15l2.5 -3.8"/>
                        <path d="M21 14.976l-2.492 -3.776"/>
                        <path d="M9 17l.5 -4"/>
                        <path d="M15 17l-.5 -4"/>
                    </>
                )}
            </svg>
        </button>
    ), [showPassword, props.disabled]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        props.onFocus?.();
    }, [props]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        props.onBlur?.();
    }, [props]);

    const commonProps = {
        id: props.id,
        name: props.name,
        value: props.value,
        onChange: props.onChange,
        required: props.required,
        disabled: props.disabled,
        readOnly: props.readOnly,
        autoComplete: props.autoComplete,
        autoFocus: props.autoFocus,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'aria-label': props.ariaLabel || props.placeholder,
        'aria-invalid': props.invalid,
        'aria-describedby': props['aria-describedby'],
        className: `${styles.input} ${props.inputClassName || ''}`.trim(),
    };

    return (
        <div
            className={`${styles.inputContainer} ${props.className || ''}`.trim()}
            data-focused={isFocused}
            data-invalid={props.invalid}
        >
            {props.type === 'select' ? (
                <select
                    {...commonProps}
                    ref={ref as React.Ref<HTMLSelectElement>}
                >
                    {props.placeholder && (
                        <option value="" disabled hidden={props.value !== ''}>
                            {props.placeholder}
                        </option>
                    )}
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : props.type === 'textarea' ? (
                <textarea
                    {...commonProps}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    placeholder={props.placeholder}
                    rows={props.rows}
                    cols={props.cols}
                />
            ) : (
                <input
                    {...commonProps}
                    ref={ref as React.Ref<HTMLInputElement>}
                    type={
                        props.type === 'password' || props.type === 'password-confirm'
                            ? (showPassword ? 'text' : 'password')
                            : props.type || 'text'
                    }
                    placeholder={props.placeholder}
                    min={(props as OtherInputProps).min}
                    max={(props as OtherInputProps).max}
                    step={(props as OtherInputProps).step}
                    pattern={(props as OtherInputProps).pattern}
                    accept={(props as OtherInputProps).accept}
                    multiple={(props as OtherInputProps).multiple}
                />
            )}

            {props.type === 'password' && <PasswordVisibilityIcon/>}
        </div>
    );
});