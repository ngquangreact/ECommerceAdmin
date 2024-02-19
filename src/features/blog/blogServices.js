import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog`);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}blog/${id}`, headersConfig);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}blog/${id}`, headersConfig);

  return response.data;
};

const createBlog = async (data) => {
  const response = await axios.post(`${baseUrl}blog`, data, headersConfig);
  return response.data;
};

const updateBlog = async (data) => {
  const response = await axios.put(
    `${baseUrl}blog/${data.id}`,
    data.blogData,
    headersConfig
  );
  return response.data;
};

const blogServices = {
  getAllBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
};

export default blogServices;
