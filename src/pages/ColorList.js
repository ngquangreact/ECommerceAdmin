import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getAllColor } from "../features/color/colorSlice";
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
const ColorList = () => {
  const [colorId, setColorId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllColor());
  }, []);

  const { colors } = useSelector((state) => state.color);
  const newColors = colors.map((color, index) => {
    return {
      key: index + 1,
      title: color.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/color/${color._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(color._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={newColors} />
        <CustomModal
          title={`Are you sure delete this color ?`}
          hideModal={() => hideModal(colorId)}
          performAction={() => {
            dispatch(deleteColor(colorId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllColor());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default ColorList;
