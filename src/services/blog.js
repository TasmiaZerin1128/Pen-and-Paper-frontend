import api from "../api";

const getAllBlogs = async (pageNumber) => {
    try {
        const response = await api.get("/blogs" + "?pagenumber=" + pageNumber + "&pagesize=5"); 
        return response;
    } catch (err) {
        return err.response;
    }
}

const getBlogsByAuthorId = async (authorId) => {
    try {
        const response = await api.get("/blogs/author/"+ authorId);
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

const editBlog = async (blogId, editedBlog) => {
    try {
        const response = await api.put("/blogs/"+ blogId, editedBlog, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}

const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete("/blogs/"+ blogId, { withCredentials: true });
        return response;
    } catch (err) {
        return err.response;
    }
}



export { getAllBlogs, createBlog, getBlogsByAuthorId, editBlog, deleteBlog };