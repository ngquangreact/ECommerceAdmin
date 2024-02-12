import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

export const getAllCoupon = async () => {
  const response = await axios.get(`${baseUrl}coupon`);

  return response.data;
};

export const createCoupon = async (coupon) => {
  const response = await axios.post(`${baseUrl}coupon`, coupon, headersConfig);

  return response.data;
};

const couponServices = { getAllCoupon, createCoupon };

export default couponServices;
