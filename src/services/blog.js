import api from "../api";

const getAllBlogs = async () => {
    try {
        const response = await api.get("/blogs");
        return response;
    } catch (err) {
        return err.response;
    }
}


export { getAllBlogs };