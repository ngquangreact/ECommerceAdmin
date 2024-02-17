import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

export const getAllColor = async () => {
  const response = await axios.get(`${baseUrl}color`);

  return response.data;
};

export const createColor = async (color) => {
  const response = await axios.post(`${baseUrl}color`, color, headersConfig);

  return response.data;
};

export const getColor = async (id) => {
  const response = await axios.get(`${baseUrl}color/${id}`, headersConfig);

  return response.data;
};

export const deleteColor = async (id) => {
  const response = await axios.delete(`${baseUrl}color/${id}`, headersConfig);

  return response.data;
};

export const updateColor = async (data) => {
  const response = await axios.put(
    `${baseUrl}color/${data.id}`,
    data.colorData,
    headersConfig
  );

  return response.data;
};

const colorServices = {
  getAllColor,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};
export default colorServices;
