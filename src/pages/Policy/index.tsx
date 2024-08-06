import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getProducts } from '@/services/product';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PolicyForm from '@/components/Policy/Form';

const Policy: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 100,
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
            { value: '1', label: 'Hiển Thị' },
            { value: '0', label: 'Tạm Ẩn' },
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

  const handleGetProducts = async () => {
    try {
      const res = await getProducts({});
      console.log('res', res)
      setData(res)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
    <Breadcrumb pageName="Chính sách - Quy định" />
      <Modal
        title="Chi tiết chính sách"
        centered
        open={modalOpen}
        width={1000}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Flex justify="end" gap={10}>
            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button
              form="productForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Đồng ý
            </Button>
          </Flex>,
        ]}
      >
        <PolicyForm/>
      </Modal>
      <Button onClick={() => setModalOpen(true)}>Tạo </Button>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Policy;
