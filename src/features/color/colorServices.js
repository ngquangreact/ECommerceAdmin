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

const colorServices = { getAllColor, createColor };
export default colorServices;
