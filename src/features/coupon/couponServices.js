import axios from "axios";
import { baseUrl } from "../../utils/base_url";
import { headersConfig } from "../../utils/axiosConfig";

export const getAllCoupon = async () => {
  const response = await axios.get(`${baseUrl}coupon`);

  return response.data;
};

export const getCoupon = async (id) => {
  const response = await axios.get(`${baseUrl}coupon/${id}`, headersConfig);

  return response.data;
};

export const updateCoupon = async (data) => {
  const response = await axios.put(
    `${baseUrl}coupon/${data.id}`,
    data.couponData,
    headersConfig
  );

  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseUrl}coupon/${id}`, headersConfig);

  return response.data;
};

export const createCoupon = async (coupon) => {
  const response = await axios.post(`${baseUrl}coupon`, coupon, headersConfig);

  return response.data;
};

const couponServices = {
  getAllCoupon,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponServices;
