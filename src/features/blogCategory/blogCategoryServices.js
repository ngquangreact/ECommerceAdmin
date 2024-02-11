import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllBlogCategory = async () => {
  const response = await axios.get(`${baseUrl}blog-category`);

  return response.data;
};

export const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${baseUrl}blog-category`,
    blogCategory,
    headersConfig
  );

  return response.data;
};

const blogCategoryServices = { getAllBlogCategory, createBlogCategory };

export default blogCategoryServices;
