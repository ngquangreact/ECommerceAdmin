import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Button, Table } from "antd";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    { type: "Jan", value: 0.11 },
    { type: "Feb", value: 0.17 },
    { type: "Mar", value: 0.01 },
    { type: "Apr", value: 0.113 },
    { type: "May", value: 0.16 },
    { type: "Jun", value: 0.125 },
    { type: "July", value: 0.24 },
    { type: "Aug", value: 0.19 },
    { type: "Sept", value: 0.22 },
    { type: "Oct", value: 0.05 },
    { type: "Nov", value: 0.01 },
    { type: "Dec", value: 0.015 },
  ];
  const config = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: ({ type }) => {
        return "#ffd333";
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="bg-white d-flex justify-content-between align-items-end p-3 rounded-3 flex-grow-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> {""}
              20%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="bg-white d-flex justify-content-between align-items-end p-3 rounded-3 flex-grow-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> {""}
              20%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="bg-white d-flex justify-content-between align-items-end p-3 rounded-3 flex-grow-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> {""}
              20%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between flex-column">
        <div className="mt-4">
          <h3 className="mb-5 title">Income Statis</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5 title">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
