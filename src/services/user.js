import api from "../api";

const getAllUsers = async () => {
    try {
        const response = await api.get("/users");
        return response;
    } catch (err) {
        return err.response;
    }
}

const getUserByUsername = async (username) => {
    try {
        const response = await api.get("/users/"+ username);
        return response;
    } catch (err) {
        return err.response;
    }
}

const updateUserByUsername = async (username, updatedUser) => {
    try {
        const response = await api.put("/users/"+ username, updatedUser, { withCredentials: true });
        console.log(response);
        return response;
    } catch (err) {
        return err.response;
    }
}



export { getAllUsers, getUserByUsername, updateUserByUsername };