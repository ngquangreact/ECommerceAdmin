import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllProduct = async () => {
  const response = await axios.get(`${baseUrl}product`);
  return response.data;
};

const createProduct = async (data) => {
  const response = await axios.post(`${baseUrl}product`, data, headersConfig);
  return response.data;
};

const productServices = {
  getAllProduct,
  createProduct,
};

export default productServices;
