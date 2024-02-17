import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  deleteCoupon,
  getAllCoupon,
  getCoupon,
} from "../features/coupon/couponSlice";
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
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState();
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupon());
  }, []);

  const { coupons } = useSelector((state) => state.coupon);
  const newCoupons = coupons.map((coupon, index) => {
    return {
      key: index + 1,
      name: coupon.name,
      expiry: new Date(coupon.expiry).toLocaleString(),
      discount: coupon.discount,
      action: (
        <>
          <Link className="fs-3" to={`/admin/coupon/${coupon._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(coupon._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={newCoupons} />
        <CustomModal
          title={`Are you sure delete this coupon ?`}
          hideModal={() => hideModal(couponId)}
          performAction={() => {
            dispatch(deleteCoupon(couponId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllCoupon());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default CouponList;
