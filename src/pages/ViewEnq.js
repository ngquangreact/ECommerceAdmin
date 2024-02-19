import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnquiry, updateEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const { enquiry } = useSelector((state) => state.enquiry);

  const goBack = () => {
    navigate(-1);
  };
  const setEnqStatus = (status, id) => {
    const data = { id, enqData: status };
    dispatch(updateEnquiry(data));
    dispatch(getEnquiry(getEnqId));
  };
  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack />
          Go Back
        </button>
      </div>
      <div className="d-flex flex-column gap-3 mt-5 bg-white p-4 rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name: </h6>
          <p className="mb-0">{enquiry.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile: </h6>
          <p className="mb-0">
            <a href={`tel:+84${enquiry.mobile}`}>{enquiry.mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email: </h6>
          <p className="mb-0">
            <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment: </h6>
          <p className="mb-0">{enquiry.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status: </h6>
          <p className="mb-0">{enquiry.status}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status: </h6>
          <div>
            <select
              className="form-control form-select"
              defaultValue={enquiry.status ? enquiry.status : "Submitted"}
              onChange={(e) => setEnqStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
