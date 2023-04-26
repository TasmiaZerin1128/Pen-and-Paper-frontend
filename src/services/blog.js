import api from "../api";

const getAllBlogs = async () => {
    try {
        const response = await api.get("/blogs");
        return response;
    } catch (err) {
        return err.response;
    }
}

const createBlog = async (newBlog) => {
    try {
        const response = await api.post("/blogs", newBlog, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}



export { getAllBlogs, createBlog };