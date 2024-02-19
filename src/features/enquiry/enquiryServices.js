import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

const getAllEnquires = async () => {
  const response = await axios.get(`${baseUrl}enquiry`);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${baseUrl}enquiry/${id}`, headersConfig);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${baseUrl}enquiry/${id}`, headersConfig);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${baseUrl}enquiry/${enq.id}`,
    { status: enq.enqData },
    headersConfig
  );
  return response.data;
};

const enquiryServices = {
  getAllEnquires,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryServices;
