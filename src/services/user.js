import api from "../api";

const getAllUsers = async (pageNumber) => {
    try {
        const response = await api.get(`/users?pagenumber=${pageNumber}&pagesize=5`);
        return response;
    } catch (err) {
        return err.response;
    }
}

const getUserByUsername = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response;
    } catch (err) {
        return err.response;
    }
}

const updateUserByUsername = async (username, updatedUser) => {
    try {
        const response = await api.put(`/users/${username}`, updatedUser, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const deleteUserByUsername = async (username) => {
    try {
        const response = await api.delete(`/users/${username}`, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}


export { getAllUsers, getUserByUsername, updateUserByUsername, deleteUserByUsername };
