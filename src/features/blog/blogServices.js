import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog`);
  return response.data;
};

const createBlog = async (data) => {
  const response = await axios.post(`${baseUrl}blog`, data, headersConfig);
  return response.data;
};

const blogServices = { getAllBlogs, createBlog };

export default blogServices;
