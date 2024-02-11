import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBlogCategory,
  resetState,
} from "../features/blogCategory/blogCategorySlice";

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, createdBlogCategory } = useSelector(
    (state) => state.blogCategory
  );
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast("Created New Blog Category!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdBlogCategory]);
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required !"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
