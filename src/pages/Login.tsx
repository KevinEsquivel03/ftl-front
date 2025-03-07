import styles from './Login.module.css';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "../components/Input.tsx";
import { SocialButton } from "../components/SocialButton";
import { SeparatorWithText } from "../components/SeparatorWithText";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailRegex.test(formData.email)) {
            console.log("email is not valid");
        } else if (!passwordRegex.test(formData.password)) {
            console.log("password is not valid");
        } else {
            console.log('Form submitted', formData);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Welcome Back</h2>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                    Email
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="username"
                    />
                </label>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password
                    <Input
                        type='password'
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        autoComplete="current-password"
                    />
                </label>
            </div>

            <div className={styles.rememberForgot}>
                <label className={styles.rememberMe}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <span>Remember me</span>
                </label>
                <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
            </div>

            <button type="submit" className={styles.submitButton}>
                Login
            </button>

            <SeparatorWithText>Or continue with</SeparatorWithText>

            <div className={styles.socialButtons}>
                <SocialButton provider="google">
                    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill='currentColor'>
                        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10 0-.67-.069-1.325-.195-1.955H12.545z"/>
                    </svg>
                    Google
                </SocialButton>

                <SocialButton provider="facebook">
                    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill='currentColor'>
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/>
                    </svg>
                    Facebook
                </SocialButton>

                <SocialButton provider="apple">
                    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill='currentColor'>
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17.38 2.93997 13.04 4.69997 10.45C5.56997 9.13 6.99997 8.41 8.34997 8.38C9.70997 8.35 10.89 9.23 11.7 9.23C12.57 9.23 14.07 8.14 15.83 8.35C16.5 8.4 18.14 8.71 19.13 10.03C19.06 10.11 17.41 11.36 17.43 13.63C17.45 16.22 19.71 17.17 19.74 17.18C19.71 17.31 19.25 18.9 18.71 19.5ZM13 7.5C12.73 6.3 13.62 5.1 14.39 4.39C15.27 3.56 16.57 3 17.5 3C17.64 4.18 17.14 5.36 16.36 6.12C15.6 6.88 14.44 7.5 13 7.5Z"/>
                    </svg>
                    Apple
                </SocialButton>
            </div>

            <div className={styles.signUp}>
                Don't have an account? <NavLink className={styles.NavLink} to="/sign-up">Sign Up</NavLink>
            </div>
        </form>
    );
};