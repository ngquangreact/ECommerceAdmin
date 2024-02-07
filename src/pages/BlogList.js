import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllblog } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

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
          <Link className="fs-3">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
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
      </div>
    </div>
  );
};

export default BlogList;
