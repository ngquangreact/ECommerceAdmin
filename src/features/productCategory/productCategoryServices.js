import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllProductCategory = async () => {
  const response = await axios.get(`${baseUrl}prod-category`);

  return response.data;
};

const createProductCategory = async (pCategoryData) => {
  const response = await axios.post(
    `${baseUrl}prod-category`,
    pCategoryData,
    headersConfig
  );

  return response.data;
};

const productCategoryServices = {
  getAllProductCategory,
  createProductCategory,
};

export default productCategoryServices;
