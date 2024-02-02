import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form>
          <CustomInput type="text" label="Enter Blog Brand" />
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
