import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getAllBlogCategory = async () => {
  const response = await axios.get(`${baseUrl}blog-category`);

  return response.data;
};

const blogCategoryServices = { getAllBlogCategory };

export default blogCategoryServices;
