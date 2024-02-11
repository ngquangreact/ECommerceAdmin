import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, resetState } from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, createdBrand } = useSelector(
    (state) => state.brand
  );
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast("Created New Brand!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdBrand]);
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required !"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/brand-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
