import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { getAllCoupon } from "../features/coupon/couponSlice";
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
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={newCoupons} />
      </div>
    </div>
  );
};

export default CouponList;
