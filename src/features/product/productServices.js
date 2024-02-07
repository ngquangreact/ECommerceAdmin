import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getAllProduct = async () => {
  const response = await axios.get(`${baseUrl}product`);
  return response.data;
};

const productServices = {
  getAllProduct,
};

export default productServices;
