import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { createColor, resetState } from "../features/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, createdColor } = useSelector(
    (state) => state.color
  );

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast("Created New Color!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdColor]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required !"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/color-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
