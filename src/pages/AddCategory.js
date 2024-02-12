import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createProductCategory,
  getProductCategory,
  resetState,
  updateProductCategory,
} from "../features/productCategory/productCategorySlice";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProCategoryId = location.pathname.split("/")[3];

  const {
    isSuccess,
    isError,
    createdProductCategory,
    nameProductCategory,
    updatedProductCategory,
  } = useSelector((state) => state.productCategory);

  useEffect(() => {
    if (getProCategoryId !== undefined) {
      dispatch(getProductCategory(getProCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getProCategoryId]);

  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast("Created New Product-category!");
    }
    if (isSuccess && updatedProductCategory) {
      toast("Updated Product-category!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdProductCategory, updatedProductCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: nameProductCategory || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProCategoryId !== undefined) {
        const data = { id: getProCategoryId, productCategoryData: values };
        dispatch(updateProductCategory(data));
      } else {
        dispatch(createProductCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/category-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getProCategoryId ? "Update" : "Add"} Product Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange}
            onBl={formik.handleBlur}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            {getProCategoryId ? "Update" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
