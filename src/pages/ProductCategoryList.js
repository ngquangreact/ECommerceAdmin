import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  getAllProductCategory,
} from "../features/productCategory/productCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductCategoryList = () => {
  const [productCategoryId, setProductCategoryId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setProductCategoryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductCategory());
  }, []);

  const { productCategories } = useSelector((state) => state.productCategory);

  const newProductCategories = productCategories.map((proCat, index) => {
    return {
      key: index + 1,
      title: proCat.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/category/${proCat._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(proCat._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={newProductCategories} />
        <CustomModal
          title={`Are you sure delete this product category ?`}
          hideModal={() => hideModal(productCategoryId)}
          performAction={() => {
            dispatch(deleteProductCategory(productCategoryId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllProductCategory());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default ProductCategoryList;
