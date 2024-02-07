import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogCategory } from "../features/blogCategory/blogCategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];
const BlogCatList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, []);

  const { blogCategories } = useSelector((state) => state.blogCategory);

  const newProductCategories = blogCategories.map((proCat, index) => {
    return {
      key: index + 1,
      title: proCat.title,
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
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={newProductCategories} />
      </div>
    </div>
  );
};

export default BlogCatList;
