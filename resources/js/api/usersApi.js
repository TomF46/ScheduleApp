import axiosClient from "../tools/axiosClient";

export function getUsers() {
    return axiosClient
        .get("/api/users")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchUsers(searchBody) {
    return axiosClient
        .post(`/api/users/search`, searchBody)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUsersPage(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchUsersWithPage(url, searchBody) {
    return axiosClient
        .post(url, searchBody)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getCurrentUser() {
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUserById(id) {
    return axiosClient
        .get(`/api/users/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUsersWithPaginator(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function deactivateUserById(id) {
    return axiosClient
        .post(`/api/users/${id}/deactivate`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function editUser(userId, user) {
    return axiosClient
        .put(`/api/users/${userId}`, user)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


