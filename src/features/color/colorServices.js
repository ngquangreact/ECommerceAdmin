import axios from "axios";
import { baseUrl } from "../../utils/base_url";

export const getAllColor = async () => {
  const response = await axios.get(`${baseUrl}color`);

  return response.data;
};
const colorServices = { getAllColor };
export default colorServices;
