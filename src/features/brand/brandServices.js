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

export const updateBrand = async (data) => {
  const response = await axios.put(
    `${baseUrl}brand/${data.id}`,
    data.brandData,
    headersConfig
  );

  return response.data;
};

export const getBrand = async (id) => {
  const response = await axios.get(`${baseUrl}brand/${id}`, headersConfig);

  return response.data;
};

export const deleteBrand = async (id) => {
  const response = await axios.delete(`${baseUrl}brand/${id}`, headersConfig);

  return response.data;
};

const brandServices = {
  getAllBrand,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandServices;
