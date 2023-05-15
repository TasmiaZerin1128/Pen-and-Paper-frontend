import api from "../api";

const getAllBlogs = async (pageNumber, pageSize) => {
    try {
        const response = await api.get(`/api/v1/blogs?pagenumber=${pageNumber}&pagesize=${pageSize}`); 
        return response;
    } catch (err) {
        return err.response;
    }
}

const getBlogsByAuthorId = async (authorId, pageNumber, pageSize) => {
    try {
        const response = await api.get(`/api/v1/blogs/author/${authorId}?pagenumber=${pageNumber}&pagesize=${pageSize}`);
        return response;
    } catch (err) {
        return err.response;
    }
}
const createBlog = async (newBlog) => {
    try {
        const response = await api.post("/api/v1/blogs", newBlog, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const editBlog = async (blogId, editedBlog) => {
    try {
        const response = await api.put(`/api/v1/blogs/${blogId}`, editedBlog, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete(`/api/v1/blogs/${blogId}`, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}



export { getAllBlogs, createBlog, getBlogsByAuthorId, editBlog, deleteBlog };