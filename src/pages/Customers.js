import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { customers, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.customer
  );
  const newCustomers = customers.map((customer, index) => {
    return {
      key: index + 1,
      name: `${customer.firstname}  ${customer.lastname}`,
      email: customer.email,
      mobile: customer.mobile,
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={newCustomers} />
      </div>
    </div>
  );
};

export default Customers;
