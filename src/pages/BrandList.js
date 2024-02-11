import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { getAllBrand } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
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
const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand());
  }, []);
  
  const { brands } = useSelector((state) => state.brand);
  const newBrands = brands.map((brand, index) => {
    return {
      key: index + 1,
      title: brand.title,
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
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={newBrands} />
      </div>
    </div>
  );
};

export default BrandList;
