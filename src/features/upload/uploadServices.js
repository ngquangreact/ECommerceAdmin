import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const uploadImgs = async (data) => {
  const response = await axios.post(`${baseUrl}upload/`, data, headersConfig);

  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${baseUrl}upload/delete-img/${id}`,
    headersConfig
  );

  return response.data;
};

const uploadServices = { uploadImgs, deleteImg };

export default uploadServices;
