import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrdersByUserId } from "../features/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersByUserId(userId));
  }, []);
  return <div>ViewOrder</div>;
};

export default ViewOrder;
