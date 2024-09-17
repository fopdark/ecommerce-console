import React, { useEffect, useState } from 'react';
import { Button, Flex, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import FeedbackForm from '@/components/Feedback/Form';
import { deleteFeedback, getFeedbacks } from '@/services/feedback';

const Feedbacks: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>();

  const columns: TableColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 150,
    },
    { title: 'Tên', dataIndex: 'title', key: 'title' },
    {
      title: 'Hiển Thị',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        <p>{value === 1 ? 'Hiển Thị' : 'Tạm Ẩn'}</p>
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
      const res = await getFeedbacks({});
      console.log('res', res);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) return;
      const res = await deleteFeedback(id);
      handleGetList();
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    setModalOpen(false);
    setSelectedRow({});
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Đánh giá khách hàng" />
      <Modal
        title="Chi tiết đánh giá khách hàng"
        centered
        open={modalOpen}
        width={1000}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={[
          <Flex justify="end" gap={10}>
            <Button key={'cancel'} onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button
              form="feedbackForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Đồng ý
            </Button>
          </Flex>,
        ]}
      >
        <FeedbackForm
          data={selectedRow}
          onSuccess={() => {
            setModalOpen(false);
            handleGetList();
          }}
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
      <Table columns={columns} dataSource={data} rowKey={'link'} />
    </>
  );
};

export default Feedbacks;
