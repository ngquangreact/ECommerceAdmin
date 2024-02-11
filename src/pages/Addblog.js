import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { deleteImage, uploadImages } from "../features/upload/uploadSlice";

import { Stepper } from "react-form-stepper";
import { createBlog, resetState } from "../features/blog/blogSlice";
import { resetImageState } from "../features/upload/uploadSlice";
import { getAllBlogCategory } from "../features/blogCategory/blogCategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required !"),
  description: Yup.string().required("Description is required !"),
  category: Yup.string().required("Category is required !"),
  images: Yup.array().test({
    message: "Images is required !",
    test: (arr) => arr.length > 0,
  }),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, []);
  const { blogCategories } = useSelector((state) => state.blogCategory);
  const { images } = useSelector((state) => state.upload);
  const { isSuccess, isError, createdBlog } = useSelector(
    (state) => state.blog
  );
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast("Created New Blog!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetImageState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });
  formik.values.images = images;

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Image" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mt-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {blogCategories.map((proCat) => {
              return (
                <option key={proCat._id} value={proCat.title}>
                  {proCat.title}
                </option>
              );
            })}
          </select>
          <div className="error-input">
            {formik.touched.category && formik.errors.category}
          </div>
          <div className="mt-3">
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error-input">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImages(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="error-input">
            {formik.touched.images && formik.errors.images}
          </div>
          <div className="show-image d-flex flex-wrap gap-3 mt-3">
            {formik.values.images?.map((img) => {
              return (
                <div className="position-relative" key={img.url}>
                  <button
                    type="button"
                    onClick={() => {
                      {
                        dispatch(deleteImage(img.public_id));
                      }
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "4px", right: "4px" }}
                  ></button>
                  <img src={img.url} width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
