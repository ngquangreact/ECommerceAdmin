import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrder = async () => {
  const response = await axios.get(`${baseUrl}user/get-all-order`, config);
  return response.data;
};

const authServices = { login, getAllOrder };

export default authServices;
