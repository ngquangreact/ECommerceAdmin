import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authServices = { login };

export default authServices;
