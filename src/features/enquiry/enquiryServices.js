import axios from "axios";
import { baseUrl } from "../../utils/base_url";

const getAllEnquires = async () => {
  const response = await axios.get(`${baseUrl}enquiry`);

  return response.data;
};

const enquiryServices = {
  getAllEnquires,
};

export default enquiryServices;
