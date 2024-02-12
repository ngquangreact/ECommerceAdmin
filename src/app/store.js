import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import blogReducer from "../features/blog/blogSlice";
import blogCategoryReducer from "../features/blogCategory/blogCategorySlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    productCategory: productCategoryReducer,
    brand: brandReducer,
    coupon: couponReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
  },
});
