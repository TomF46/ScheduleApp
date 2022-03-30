import axiosClient from "../tools/axiosClient";

export function Login(userLoginDetails) {
    return axiosClient
        .post("/api/auth/login", userLoginDetails)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function Register(registrationDetails) {
    return axiosClient
        .post("/api/auth/register", registrationDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getCurrentUser() {
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getUserIsAdmin() {
    return axiosClient
        .get('/api/me/isAdmin')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function ChangePassword(passwordChangeDetails) {
    return axiosClient
        .post("/api/auth/changePassword", passwordChangeDetails)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

