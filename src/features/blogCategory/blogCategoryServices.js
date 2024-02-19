import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllBlogCategory = async () => {
  const response = await axios.get(`${baseUrl}blog-category`);

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(
    `${baseUrl}blog-category/${id}`,
    headersConfig
  );

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${baseUrl}blog-category/${id}`,
    headersConfig
  );

  return response.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${baseUrl}blog-category`,
    blogCategory,
    headersConfig
  );

  return response.data;
};

const updateBlogCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}blog-category/${data.id}`,
    data.blogCategoryData,
    headersConfig
  );

  return response.data;
};

const blogCategoryServices = {
  getAllBlogCategory,
  createBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};

export default blogCategoryServices;
