import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, resetState } from "../features/coupon/couponSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, createdCoupon } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast("Created New Coupon!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdCoupon]);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required !"),
    expiry: Yup.date().required("Expiry Date is required !"),
    discount: Yup.number().required("Discount Percentage is required !"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error-input">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error-input">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error-input">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
