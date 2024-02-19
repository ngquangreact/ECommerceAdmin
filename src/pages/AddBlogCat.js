import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/blogCategory/blogCategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required !"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCategoryId = location.pathname.split("/")[3];
  const {
    isSuccess,
    isError,
    createdBlogCategory,
    nameBlogCategory,
    udpatedBlogCategory,
  } = useSelector((state) => state.blogCategory);

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getBlogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast("Created New Blog Category!");
    }
    if (isSuccess && udpatedBlogCategory) {
      toast("Updated Blog-category!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdBlogCategory, udpatedBlogCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: nameBlogCategory || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCategoryId !== undefined) {
        const data = { id: getBlogCategoryId, blogCategoryData: values };
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(createBlogCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCategoryId ? "Update" : "Add"} Blog Category
      </h3>
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
            {getBlogCategoryId ? "Update" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
