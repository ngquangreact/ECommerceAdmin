import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const { isSuccess, isError, createdColor, updatedColor, nameColor } =
    useSelector((state) => state.color);

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast("Created New Color!");
    }
    if (isSuccess && updatedColor) {
      toast("Updated Color!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdColor, updatedColor]);

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required !"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: nameColor || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("update color");
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/color-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getColorId ? "Update" : "Add"} Color</h3>
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
            {getColorId ? "Update" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
