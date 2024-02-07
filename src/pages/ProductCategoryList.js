import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductCategory } from "../features/productCategory/productCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

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
          <Link className="fs-3">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={newProductCategories} />
      </div>
    </div>
  );
};

export default ProductCategoryList;
