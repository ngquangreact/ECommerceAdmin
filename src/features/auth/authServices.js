import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrder = async () => {
  const response = await axios.get(
    `${baseUrl}user/get-all-order`,
    headersConfig
  );
  return response.data;
};

const authServices = { login, getAllOrder };

export default authServices;
