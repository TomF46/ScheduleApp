import axiosClient from "../tools/axiosClient";

export function getTaskById(id) {
    return axiosClient
        .get(`/api/tasks/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getTasks() {
    return axiosClient
        .get('/api/tasks')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getTasksPaginated() {
    return getTasksWithUrl(`/api/tasks?`);
}

export function getTasksWithPaginator(url) {
    return getTasksWithUrl(url);
}

export function getTasksWithUrl(url) {
    return axiosClient
        .get(`${url}&paginated=true`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

// export function searchTasks(searchBody) {
//     return axiosClient
//         .post(`/api/tasks/search`, searchBody)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             throw error;
//         });
// }

// export function searchTasksWithPage(url, searchBody) {
//     return axiosClient
//         .post(url, searchBody)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             throw error;
//         });
// }

export function createTask(task) {
    return axiosClient
        .post("/api/tasks", task)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function editTask(taskId, task) {
    return axiosClient
        .put(`/api/tasks/${taskId}`, task)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function deleteTaskById(id) {
    return axiosClient
        .delete(`/api/tasks/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function assignUser(taskId, userId) {
    return axiosClient
        .post(`/api/tasks/${taskId}/assign/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function unassignUser(taskId, userId) {
    return axiosClient
        .post(`/api/tasks/${taskId}/unassign/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

