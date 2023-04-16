import api from "../api";

const register = async (newUser) => {
    try {
        const response = await api.post("/auth/register", newUser);
        localStorage.setItem('accesstoken', response.data.accesstoken);
        return response;
    } catch (err) {
        return err.response;
    }
}

const login = async (loginUser) => {
    try {
        const response = await api.post("/auth/login", loginUser);
        localStorage.setItem('accesstoken', response.data.accesstoken);
        return response;
    } catch (err) {
        return err.response;
    }
}

export { register, login };