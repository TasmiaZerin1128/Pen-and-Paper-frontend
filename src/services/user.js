import api from "../api";

const getAllUsers = async (pageNumber) => {
    try {
        const response = await api.get(`/api/v1/users?pagenumber=${pageNumber}&pagesize=5`);
        return response;
    } catch (err) {
        return err.response;
    }
}

const getUserByUsername = async (username) => {
    try {
        const response = await api.get(`/api/v1/users/${username}`);
        return response;
    } catch (err) {
        return err.response;
    }
}

const updateUserByUsername = async (username, updatedUser) => {
    try {
        const response = await api.put(`/api/v1/users/${username}`, updatedUser, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const deleteUserByUsername = async (username) => {
    try {
        const response = await api.delete(`/api/v1/users/${username}`, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}


export { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername };
