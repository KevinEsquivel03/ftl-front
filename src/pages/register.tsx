import React, {useState, useEffect, useCallback} from "react";
import styles from "./Register.module.css";
import {NavLink} from "react-router-dom";
import {Input} from "../components/Input";
import {SocialButton} from "../components/SocialButton";
import {SeparatorWithText} from "../components/SeparatorWithText";
import countryListJSON from "../assets/json/countryNames.json";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

// ---------- Tipos y Modelos ----------
type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    viewGender: string;
    genderPreferences: string;
    state: string;
    country: string;
    city: string;
    password: string;
    myInterests: string;
};

type Option = { value: string; label: string };

// ---------- Validadores (Single Responsibility: separación de la lógica de validación) ----------
const validators = {
    required: (value: string): boolean => value.trim().length > 0,
    email: (value: string): boolean =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
    password: (value: string): boolean =>
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}/.test(value),
    phone: (value: string): boolean =>
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value),
};

// ---------- Helpers ----------
/**
 * Calcula la fecha límite en el pasado restando una cantidad de años.
 */
const calculateDatePast = (years: number): string => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
};

// ---------- Servicio API (Encapsula la llamada a la API) ----------
const fetchData = async (options: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// ---------- Componente Register ----------
export const Register = () => {
    // Estado del formulario y errores
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        username: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        viewGender: "",
        genderPreferences: "",
        state: "",
        country: "",
        city: "",
        password: "",
        myInterests: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
        {}
    );

    // Listas para select
    const [countryList, setCountryList] = useState<Option[]>([]);
    const [stateList, setStateList] = useState<Option[]>([]);
    const [cityList, setCityList] = useState<Option[]>([]);

    // Opciones para gender y pronombres
    const genderOptions: Option[] = [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"},
        {value: "nonBinary", label: "Non Binary"},
    ];

    const genderAdditionOptions: Option[] = [
        {value: "asexual", label: "Asexual"},
        {value: "bigender", label: "Bigender"},
        {value: "androgyne", label: "Androgyne"},
        {value: "genderFluid", label: "Gender Fluid"},
        {value: "transgender", label: "Transgender"},
        {value: "other", label: "Other"},
    ];

    const pronounOptions: Option[] = [
        {value: "he/him", label: "He/Him"},
        {value: "she/her", label: "She/Her"},
        {value: "they/them", label: "They/Them"},
        {value: "other", label: "Other"},
    ];

    interface State {
        isoCode: string;
        name: string;
    }

    interface City {
        name: string;
    }

    // ---------- Manejo de Listas de Ubicación ----------
    useEffect(() => {
        const countries: Option[] = Object.entries(countryListJSON).map(
            ([code, name]) => ({
                value: code,
                label: name,
            })
        );
        setCountryList(countries);
    }, []);

    const fetchStates = useCallback(async () => {
        if (!formData.country) {
            setStateList([]);
            return;
        }
        const data = await fetchData({
            method: "GET",
            url: "https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode",
            params: {countrycode: formData.country},
            headers: {
                "x-rapidapi-key": "e4b781a3d1msh10cd97868131de6p18d7afjsnb6ca4ae59a07",
                "x-rapidapi-host":
                    "country-state-city-search-rest-api.p.rapidapi.com",
            },
        });
        const states: Option[] = (data || []).map((state: State) => ({
            value: state.isoCode,
            label: state.name,
        }));

        setStateList(states);
    }, [formData.country]);

    const fetchCities = useCallback(async () => {
        if (!formData.country || !formData.state) {
            setCityList([]);
            return;
        }
        const data = await fetchData({
            method: "GET",
            url:
                "https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode",
            params: {
                countrycode: formData.country,
                statecode: formData.state,
            },
            headers: {
                "x-rapidapi-key": "e4b781a3d1msh10cd97868131de6p18d7afjsnb6ca4ae59a07",
                "x-rapidapi-host":
                    "country-state-city-search-rest-api.p.rapidapi.com",
            },
        });
        const cities: Option[] = (data || []).map((city: City) => ({
            value: city.name,
            label: city.name,
        }));
        setCityList(cities);
    }, [formData.country, formData.state]);

    useEffect(() => {
        fetchStates();
    }, [fetchStates]);

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    // ---------- Validación y Manejo de Cambios ----------
    const validateField = useCallback(
        (name: keyof FormData, value: string): boolean => {
            let error = "";
            if (
                ["firstName", "lastName", "username", "country", "state", "city", "gender"].includes(
                    name
                ) &&
                !validators.required(value)
            ) {
                error = "This field is required";
            } else if (name === "email" && !validators.email(value)) {
                error = "Invalid email address";
            } else if (name === "password" && !validators.password(value)) {
                error =
                    "Password must contain 8+ chars with uppercase, lowercase, number, and special character";
            } else if (name === "phoneNumber" && !validators.phone(value)) {
                error = "Invalid phone number";
            }
            setErrors((prev) => ({...prev, [name]: error}));
            return error === "";
        },
        []
    );

    const validateForm = useCallback((): boolean => {
        let isValid = true;
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        for (const [key, value] of Object.entries(formData)) {
            const field = key as keyof FormData;
            let error = "";
            if (
                ["firstName", "lastName", "username", "country", "state", "city", "gender"].includes(
                    field
                ) &&
                !validators.required(value)
            ) {
                error = "This field is required";
            } else if (field === "email" && !validators.email(value)) {
                error = "Invalid email address";
            } else if (field === "password" && !validators.password(value)) {
                error =
                    "Password must contain 8+ chars with uppercase, lowercase, number, and special character";
            } else if (field === "phoneNumber" && !validators.phone(value)) {
                error = "Invalid phone number";
            }
            if (error) {
                isValid = false;
                newErrors[field] = error;
            }
        }
        setErrors(newErrors);
        return isValid;
    }, [formData]);

    const handleInputChange = useCallback(
        (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLSelectElement>
                | React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            const {name, value} = e.target;
            setFormData((prev) => ({...prev, [name]: value}));
            validateField(name as keyof FormData, value);
        },
        [validateField]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (validateForm()) {
                console.log("Registration Data:", formData);
                // Lógica de envío (submit) al backend
            }
        },
        [formData, validateForm]
    );

    // ---------- Renderizado de Errores en el Input ----------
    const renderError = (field: keyof FormData) =>
        errors[field] ? (
            <span className={styles.error}>{errors[field]}</span>
        ) : null;

    // ---------- Render ----------
    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.title}>Create Account</h2>

            {/* Personal Information Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("firstName")}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("lastName")}
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <Input
                            type="text"
                            name="username"
                            placeholder="johndoe123"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("username")}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            type="tel"
                            name="phoneNumber"
                            placeholder="+1 234 567 890"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("phoneNumber")}
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {renderError("email")}
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        min={calculateDatePast(100)}
                        max={calculateDatePast(18)}
                        required
                    />
                    {renderError("dateOfBirth")}
                </div>
            </div>

            {/* Location Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Location</h3>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <Input
                            type="select"
                            name="country"
                            value={formData.country}
                            placeholder="Country"
                            options={countryList}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("country")}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            type="select"
                            name="state"
                            value={formData.state}
                            placeholder="State"
                            options={stateList}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("state")}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            type="select"
                            name="city"
                            value={formData.city}
                            placeholder="City"
                            options={cityList}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("city")}
                    </div>
                </div>
            </div>

            {/* Gender Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Gender</h3>
                <div className={styles.inputContainer}>
                    <Input
                        type="select"
                        name="gender"
                        value={formData.gender}
                        options={genderOptions}
                        placeholder="Select Gender"
                        onChange={handleInputChange}
                        required
                    />
                    {renderError("gender")}
                </div>
                <div className={styles.row}>
                    <div className={styles.inputContainer}>
                        <Input
                            type="select"
                            name="viewGender"
                            value={formData.viewGender}
                            placeholder="Other Gender?"
                            options={genderAdditionOptions}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("viewGender")}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            type="select"
                            name="genderPreferences"
                            value={formData.genderPreferences}
                            placeholder="What's your pronouns?"
                            options={pronounOptions}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError("genderPreferences")}
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type="text"
                        name="myInterests"
                        placeholder="Favorite Hobby"
                        value={formData.myInterests}
                        onChange={handleInputChange}
                    />
                    {renderError("myInterests")}
                </div>
            </div>

            {/* Account Information Section */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Account Information</h3>
                <div className={styles.inputContainer}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {renderError("password")}
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                Create Account
            </button>

            <SeparatorWithText>Or sign up with</SeparatorWithText>

            <div className={styles.socialButtons}>
                <SocialButton provider="google">Google</SocialButton>
                <SocialButton provider="facebook">Facebook</SocialButton>
                <SocialButton provider="apple">Apple</SocialButton>
            </div>

            <div className={styles.signIn}>
                Already have an account?{" "}
                <NavLink className={styles.NavLink} to="/login">
                    Sign In
                </NavLink>
            </div>
        </form>
    );
};
