import React, { useState } from 'react';
import { Input, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form } from 'react-router-dom';
import ProductForm from './Form';

interface DataType {
  key: React.Key;
  index: number;
  name: string;
  status: boolean;
}

const data: DataType[] = [
  {
    key: 1,
    index: 1,
    name: 'John Brown',
    status: true,
  },
  {
    key: 2,
    index: 1,
    name: 'John Brown',
    status: true,
  },
  {
    key: 3,
    index: 1,
    name: 'John Brown',
    status: false,
  },
  {
    key: 4,
    index: 1,
    name: 'John Brown',
    status: false,
  },
  {
    key: 5,
    index: 1,
    name: 'John Brown',
    status: false,
  },
];

const ServiceTable: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: () => <Input />,
    },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    {
      title: 'Hiển Thị',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          value={value}
          options={[
            { value: true, label: 'Hiển Thị' },
            { value: false, label: 'Tạm Ẩn' },
          ]}
        />
      ),
    },
    {
      title: 'Thao Tác',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2">
          <EditOutlined
            className="cursor-pointer"
            style={{
              fontSize: 20,
            }}
            onClick={() => setModalOpen(true)}
          />
          <DeleteOutlined
            className="cursor-pointer"
            style={{
              fontSize: 20,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Chi tiết sản phẩm"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={1000}
        // footer={false}
        okText={"Đồng ý"}
        cancelText={"Hủy"}
      >
        <ProductForm />
      </Modal>
      <Table
        columns={columns}
        // expandable={{
        //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        //   rowExpandable: (record) => record.name !== 'Not Expandable',
        // }}
        dataSource={data}
      />
    </>
  );
};

export default ServiceTable;
