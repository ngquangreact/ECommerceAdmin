import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}user/users`);

  return response.data;
};

const customerServices = {
  getUsers,
};

export default customerServices;
