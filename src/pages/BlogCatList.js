import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogCategory, getAllBlogCategory } from "../features/blogCategory/blogCategorySlice";
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
const BlogCatList = () => {
  const [blogCategoryId, setBlogCategoryId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    setBlogCategoryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, []);

  const { blogCategories } = useSelector((state) => state.blogCategory);

  const newProductCategories = blogCategories.map((blogCat, index) => {
    return {
      key: index + 1,
      title: blogCat.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/blog-category/${blogCat._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCat._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });
  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={newProductCategories} />
        <CustomModal
          title={`Are you sure delete this blog category ?`}
          hideModal={() => hideModal(blogCategoryId)}
          performAction={() => {
            dispatch(deleteBlogCategory(blogCategoryId));
            setOpen(false);
            setTimeout(() => {
              dispatch(getAllBlogCategory());
            }, 200);
          }}
          open={open}
        />
      </div>
    </div>
  );
};

export default BlogCatList;
