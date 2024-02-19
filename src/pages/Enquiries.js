import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getAllEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";

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
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const [enqId, setEnqId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setEnqId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiry());
  }, []);
  const { enquiries, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.enquiry
  );
  const setEnqStatus = (status, id) => {
    const data = { id, enqData: status };
    dispatch(updateEnquiry(data));
  };
  const newEnquiries = enquiries.map((enquiry, index) => {
    return {
      key: index + 1,
      ...enquiry,
      status: (
        <>
          <select
            className="form-control form-select"
            defaultValue={enquiry.status ? enquiry.status : "Submitted"}
            onChange={(e) => setEnqStatus(e.target.value, enquiry._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 bg-transparent border-0"
            to={`/admin/enquiries/${enquiry._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiry._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Enquires</h3>
      <div>
        <Table columns={columns} dataSource={newEnquiries} />
        <CustomModal
          title={`Are you sure delete this enquiry ?`}
          hideModal={() => hideModal(enqId)}
          performAction={() => {
            dispatch(deleteEnquiry(enqId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllEnquiry());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default Enquiries;
