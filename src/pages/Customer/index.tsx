import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Select, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CustomerForm from '../../components/Customer/Form';
import { getSliderList } from '../../services/slider';
import { deleteRequest, getCustomerRequestList } from '@/services/customer';
import { ICustomerRequest } from '@/types/customer';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

interface DataType {
  key: React.Key;
  index: number;
  name: string;
  phone: string;
  status: string;
  createdAt: any;
}

// const data: DataType[] = [
//   {
//     key: 1,
//     index: 1,
//     name: 'John Brown',
//     phone: '0967199941',
//     createdAt: dayjs().toISOString(),
//     status: '0',
//   },
// ];

const Customer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<ICustomerRequest[]>([]);

  const [selectedRow, setSelectedRow] = useState<any>();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) return;
      const res = await deleteRequest(id);
      handleGetList();
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<ICustomerRequest> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 100,
      // render: (value) => <Input value={value} />,
    },
    { title: 'Họ Tên', dataIndex: 'name', key: 'name' },
    { title: 'Điện Thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs().format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        <Select
          style={{ width: 150 }}
          onChange={handleChange}
          value={value}
          disabled
          options={[
            { value: 0, label: 'Đang chờ duyêt' },
            { value: 1, label: 'Đã xem' },
            { value: 2, label: 'Đã liên hệ' },
            { value: 3, label: 'Đã thông báo' },
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
            onClick={() => {
              setModalOpen(true);
              setSelectedRow(record);
            }}
          />
          <DeleteOutlined
            className="cursor-pointer"
            style={{
              fontSize: 20,
            }}
            onClick={() => {
              handleDelete(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  const handleGetList = async () => {
    try {
      const res = await getCustomerRequestList({});
      setData(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Khách hàng" />
      <Modal
        title="Thông tin khách hàng"
        centered
        open={modalOpen}
        // onOk={() => setModalOpen(false)}
        // onCancel={() => setModalOpen(false)}
        width={1000}
        // footer={false}
        // okText={"Đồng ý"}
        // cancelText={"Hủy"}
        // onClose={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Flex justify="end" gap={10}>
            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
            <Button
              form="customerForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Đồng ý
            </Button>
          </Flex>,
        ]}
      >
        <CustomerForm
          onSuccess={() => {
            setModalOpen(false);
            handleGetList();
          }}
          data={selectedRow}
        />
      </Modal>
      <Flex className="mb-4" justify="end">
        <Button
          className="ml-auto"
          type="primary"
          onClick={() => setModalOpen(true)}
        >
          Tạo
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Customer;
