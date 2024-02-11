import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProductCategory,
  resetState,
} from "../features/productCategory/productCategorySlice";
import { toast } from "react-toastify";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, createdProductCategory } = useSelector(
    (state) => state.productCategory
  );
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast("Created New Product-category!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdProductCategory]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProductCategory(values));
      console.log(createdProductCategory);
      if (createdProductCategory) {
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/category-list");
        }, 2000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product Category</h3>
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
