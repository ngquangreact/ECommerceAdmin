import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  resetState,
  getBrand,
  updateBrand,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required !"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];

  const { isSuccess, isError, createdBrand, nameBrand, updatedBrand } =
    useSelector((state) => state.brand);
    
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast("Created New Brand!");
    }

    if (isSuccess && updatedBrand) {
      toast("Updated Brand");
    }

    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdBrand, updatedBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: nameBrand || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createBrand(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/brand-list");
      }, 1500);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
