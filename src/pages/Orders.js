import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);
  const newOrders = orders.map((order, index) => {
    return {
      key: index + 1,
      name: `${order.orderBy.firstname} ${order.orderBy.lastname}`,
      amount: `$ ${order.paymentIntent.amount}`,
      date: new Date(order.createdAt).toLocaleString(),
      action: (
        <>
          <Link
            className="ms-3 fs-3 bg-transparent border-0"
            to={`/admin/orders/${order.orderBy._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            // onClick={() => showModal(enquiry._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });
  console.log(orders);
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={newOrders} />
      </div>
    </div>
  );
};

export default Orders;
