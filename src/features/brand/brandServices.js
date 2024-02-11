import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

export const getAllBrand = async () => {
  const response = await axios.get(`${baseUrl}brand`);

  return response.data;
};

export const createBrand = async (brand) => {
  const response = await axios.post(`${baseUrl}brand`, brand, headersConfig);

  return response.data;
};

const brandServices = { getAllBrand, createBrand };
export default brandServices;
