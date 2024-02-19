import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getAllblog } from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Views",
    dataIndex: "numViews",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BlogList = () => {
  const [blogId, setBlogId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllblog());
  }, []);
  const { blogs } = useSelector((state) => state.blog);
  const newBlogs = blogs.map((blog, index) => {
    return {
      key: index + 1,
      action: (
        <>
          <Link className="fs-3" to={`/admin/blog/${blog._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blog._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
      ...blog,
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">BlogList</h3>
      <div>
        <Table columns={columns} dataSource={newBlogs} />
        <CustomModal
          title={`Are you sure delete this blog ?`}
          hideModal={() => hideModal(blogId)}
          performAction={() => {
            dispatch(deleteBlog(blogId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllblog());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default BlogList;
