import api from "../api";

const register = async (newUser) => {
    try {
        console.log("Entered this url");
        const response = await api.post("/api/v1/auth/register", newUser, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const login = async (loginUser) => {
    console.log("Entered this url");
    try {
        const response = await api.post("/api/v1/auth/login", loginUser, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const logout = async () => {
    try {
        const response = await api.post("/api/v1/auth/logout");
        return response;
    } catch (err) {
        return err.response;
    }
}

export { register, login, logout };

