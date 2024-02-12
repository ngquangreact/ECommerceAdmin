import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { deleteBrand, getAllBrand } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
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
const BrandList = () => {
  const [brandId, setBrandId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
          <Link to={`/admin/brand/${brand._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brand._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={newBrands} />
        <CustomModal
          title={`Are you sure delete this brand ?`}
          hideModal={() => hideModal(brandId)}
          performAction={() => {
            dispatch(deleteBrand(brandId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllBrand());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default BrandList;
