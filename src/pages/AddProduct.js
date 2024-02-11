import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../features/brand/brandSlice";
import { getAllProductCategory } from "../features/productCategory/productCategorySlice";
import { getAllColor } from "../features/color/colorSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import {
  deleteImage,
  resetImageState,
  uploadImages,
} from "../features/upload/uploadSlice";
import { createProduct, resetState } from "../features/product/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colorsSelected, setColorsSelected] = useState([
    {
      _id: "658d405969df0b1352a638f7",
      title: "White",
    },
  ]);

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllProductCategory());
    dispatch(getAllColor());
    formik.values.colors = [...colorsSelected];
  }, []);

  const { brands } = useSelector((state) => state.brand);
  const { productCategories } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.color);
  const { images } = useSelector((state) => state.upload);
  const { isSuccess, isError, createdProduct } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast("Created New Product!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError]);

  let schema = Yup.object().shape({
    title: Yup.string().required("Title is required !"),
    description: Yup.string().required("Description is required !"),
    price: Yup.number().required("Price is required !"),
    brand: Yup.string().required("Brand is required !"),
    category: Yup.string().required("Category is required !"),
    tags: Yup.string().required("Tags is required !"),
    quantity: Yup.number().required("Quantity is required !"),
    colors: Yup.array().test({
      message: "Colors is required !",
      test: (arr) => arr.length > 0,
    }),
    images: Yup.array().test({
      message: "Images is required !",
      test: (arr) => arr.length > 0,
    }),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      quantity: "",
      colors: [],
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetImageState());
        navigate("/admin/product-list");
      }, 3000);
    },
  });
  formik.values.images = images;

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error-input">
            {formik.touched.title && formik.errors.title}
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
          <CustomInput
            i_class="mt-3"
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error-input">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            className="form-control py-3 mt-3"
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
          >
            <option value={undefined}>Select Brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand._id} value={brand.title}>
                  {brand.title}
                </option>
              );
            })}
          </select>
          <div className="error-input">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            className="form-control py-3 mt-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Category</option>
            {productCategories.map((proCat) => {
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
          <select
            className="form-control py-3 mt-3"
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
          >
            <option value="">Select Tags</option>
            <option value="popular">Popular</option>
            <option value="featured">Featured</option>
            <option value="special">Special</option>
          </select>
          <div className="error-input">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Multiselect
            busy={colors.length > 0 ? false : true}
            name="color"
            dataKey="title"
            textField="title"
            data={colors}
            value={formik.values.colors}
            onChange={(value) => {
              setColorsSelected(value);
              formik.values.colors = value;
            }}
            className="mt-3"
          />
          <div className="error-input">
            {formik.touched.colors && formik.errors.colors}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            i_class="mt-3"
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error-input">
            {formik.touched.quantity && formik.errors.quantity}
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
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
