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

const getProductCategory = async (id) => {
  const response = await axios.get(
    `${baseUrl}prod-category/${id}`,
    headersConfig
  );

  return response.data;
};

const updateProductCategory = async (data) => {
  const response = await axios.put(
    `${baseUrl}prod-category/${data.id}`,
    data.productCategoryData,
    headersConfig
  );

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(
    `${baseUrl}prod-category/${id}`,
    headersConfig
  );

  return response.data;
};

const productCategoryServices = {
  getAllProductCategory,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default productCategoryServices;
