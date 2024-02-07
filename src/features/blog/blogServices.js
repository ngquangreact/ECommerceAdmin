import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getAllBlogs = async () => {
  const response = await axios.get(`${baseUrl}blog`);
  return response.data;
};

const blogServices = { getAllBlogs };

export default blogServices;
