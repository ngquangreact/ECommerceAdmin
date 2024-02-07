import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getAllBrand = async () => {
  const response = await axios.get(`${baseUrl}brand`);

  return response.data;
};
const brandServices = { getAllBrand };
export default brandServices;
