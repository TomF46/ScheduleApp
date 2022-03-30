import React, { useState } from "react";
import { toast } from "react-toastify";
import { Register } from "../../../api/authenticationApi";
import RegisterForm from "./RegisterForm";

const RegisterPage = ({ history }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function formIsValid() {
        const { firstName, lastName, email, password, password_confirmation } = user;
        const errors = {};
        if (!firstName) errors.firstName = "First Name is required";
        if (!lastName) errors.lastName = "Last Name is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (!password_confirmation)
            errors.password_confirmation = "Confirmation is required";
        if (password_confirmation != password)
            errors.password_confirmation =
                "Password confirmation does not match password";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        Register(user)
            .then(response => {
                toast.success("Successfully registered!");
                history.push("/auth/login");
            })
            .catch(err => {
                setSaving(false);
                toast.error(formatErrorText(err), {
                    autoClose: false,
                });
            });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    return (
        <div className="registration-page">
            <div className="register-form">
                <RegisterForm
                    user={user}
                    errors={errors}
                    onChange={handleChange}
                    onSave={handleSave}
                    saving={saving}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
