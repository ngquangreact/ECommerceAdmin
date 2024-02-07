import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getAllProductCategory = async () => {
  const response = await axios.get(`${baseUrl}prod-category`);

  return response.data;
};

const productCategoryServices = { getAllProductCategory };

export default productCategoryServices;
