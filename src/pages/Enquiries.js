import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiry } from "../features/enquiry/enquirySlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiry());
  }, []);
  const { enquiries, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.enquiry
  );
  const newEnquiries = enquiries.map((enquiry, index) => {
    return {
      key: index + 1,
      ...enquiry,
      status: (
        <>
          <select name="" className="form-control form-select" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Enquires</h3>
      <div>
        <Table columns={columns} dataSource={newEnquiries} />
      </div>
    </div>
  );
};

export default Enquiries;
